use base64::{engine::general_purpose, Engine as _};
use mime::Mime;
use png::Compression;
use png_libimagequant::optimization::{Optimization, Work, WorkStatus};
use png_libimagequant::{PROGRESS_COMPLETE, PROGRESS_CONSTANT};
use std::io::Read;
use std::{fs, io, path::Path};
use tauri;

/// 预览图最大文件大小，大于此值的图将返回`base64`的空字符串
const PREVIEW_MAX_LEN: u64 = 10485760;

#[tauri::command]
pub async fn compression_handle(
    window: tauri::Window,
    list: Vec<(usize, String)>,
    speed: usize,
    quality_minimum: usize,
    quality_target: usize,
    dithering_level: f32,
    compression: String,
) {
    println!("Window: {} \r\nList: {:#?} ", window.label(), list,);
    let compression = compression.as_str();
    let compression = match compression {
        "Best" => Compression::Best,
        "Fast" => Compression::Fast,
        _ => Compression::Default,
    };

    let mut files_info = vec![];
    for (id, path) in list.iter() {
        let file_name = Path::new(path).file_name().unwrap().to_str().unwrap();
        let file_type = find_mimetype(file_name);
        let base64 = match read_base64(path.to_string()) {
            Ok(base64) => format!("data:{};base64,{}", file_type.to_string(), base64),
            Err(_) => "".to_string(),
        };
        files_info.push((id, file_name, base64))
    }
    window.emit("files-info", files_info).unwrap();
    let mut worklist: Vec<Work> = vec![];
    for (id, path) in list.iter() {
        let path = Path::new(path).to_path_buf();
        worklist.push(Work {
            id: *id,
            path: path,
            status: WorkStatus::INIT,
            progress: 0,
            original_size: 0,
            size: 0,
            err: None,
        })
    }
    let mut optimization = Optimization::new(
        Some(speed.try_into().unwrap()),
        Some(quality_minimum.try_into().unwrap()),
        Some(quality_target.try_into().unwrap()),
        Some(dithering_level),
        Some(compression),
        &mut worklist,
    );
    optimization.run_worklist(
        |work| {
            let progress = (work.progress as f32) / PROGRESS_CONSTANT * PROGRESS_COMPLETE;
            window
                .emit("progress", (work.id, progress.round()))
                .unwrap()
        },
        |work| {
            let progress = (work.progress as f32) / PROGRESS_CONSTANT * PROGRESS_COMPLETE;
            println!("{:#?}", work);
            let status = match work.status {
                WorkStatus::INIT => "INIT",
                WorkStatus::WAIT => "WAIT",
                WorkStatus::END => "END",
                WorkStatus::ERROR => {
                    if let Some(err) = work.err {
                        let err = err.to_string();
                        window.emit("error", (work.id, err));
                    }
                    "ERROR"
                }
            };
            window
                .emit(
                    "status",
                    (work.id, status, progress, work.original_size, work.size),
                )
                .unwrap()
        },
    );
}

/// 读取文件数据转换为base64格式的数据
fn read_base64(path: String) -> io::Result<String> {
    let mut f = fs::File::open(path)?;
    let meta = f.metadata()?;
    if meta.len() < PREVIEW_MAX_LEN {
        let mut buffer = Vec::new();
        // 读取整个文件
        f.read_to_end(&mut buffer)?;
        let str = general_purpose::STANDARD.encode(&buffer);
        Ok(str)
    } else {
        Err(io::ErrorKind::Other.into())
    }
}

fn find_mimetype(filename: &str) -> Mime {
    let parts: Vec<&str> = filename.split('.').collect();

    let res = match parts.last() {
        Some(v) => match *v {
            "png" => mime::IMAGE_PNG,
            "jpg" => mime::IMAGE_JPEG,
            "gif" => mime::IMAGE_GIF,
            &_ => mime::TEXT_PLAIN,
        },
        None => mime::TEXT_PLAIN,
    };
    return res;
}
