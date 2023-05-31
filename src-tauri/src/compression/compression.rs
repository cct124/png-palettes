use base64::{engine::general_purpose, Engine as _};
use mime::Mime;
use png::Compression;
use png_libimagequant::optimization::{Optimization, Work, WorkStatus};
use png_libimagequant::{PROGRESS_COMPLETE, PROGRESS_CONSTANT};
use std::ffi::OsStr;
use std::fs::DirEntry;
use std::io::Read;
use std::path::PathBuf;
use std::{fs, io, path::Path};
use tauri::{self, Window};

/// 预览图最大文件大小，大于此值的图将返回`base64`的空字符串
const PREVIEW_MAX_LEN: u64 = 10485760;

#[tauri::command]
pub async fn compression_handle(
    window: tauri::Window,
    is_dir: bool,
    list: Vec<(usize, String)>,
    speed: usize,
    quality_minimum: usize,
    quality_target: usize,
    dithering_level: f32,
    compression: String,
) {
    let compression = compression.as_str();
    let compression = match compression {
        "Best" => Compression::Best,
        "Fast" => Compression::Fast,
        _ => Compression::Default,
    };

    let mut worklist: Vec<Work> = vec![];
    if is_dir {
        let (_id, path) = &list[0];
        let path = Path::new(&path).to_path_buf();
        generate_worklist(path, &mut worklist);
        let mut list: Vec<(usize, String)> = vec![];
        for work in worklist.iter() {
            list.push((work.id, work.path.to_string_lossy().to_string()))
        }
        files_info(&window, &list)
    } else {
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

        files_info(&window, &list)
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

/// 生成工作列表
fn generate_worklist(path: PathBuf, paths: &mut Vec<Work>) {
    visit_dirs(path, &mut |entry| iterate_pngs(entry, paths)).unwrap();
}

/// 遍历目录查找png图片
fn iterate_pngs(entry: DirEntry, paths: &mut Vec<Work>) {
    // 文件扩展名是否是png文件
    if has_extension(&entry.path(), vec!["png"], None) {
        // 是png文件存入数组
        paths.push(Work {
            id: paths.len(),
            path: entry.path(),
            status: WorkStatus::INIT,
            progress: 0,
            original_size: 0,
            size: 0,
            err: None,
        })
    }
}

/// 检查文件扩展名以及需要排除的文件
fn has_extension(path: &Path, extension: Vec<&str>, exclude: Option<Vec<String>>) -> bool {
    if let Some(exclude) = exclude {
        let file_name = path.file_name().unwrap().to_str().unwrap();
        if exclude.iter().any(|f| f == file_name) {
            return false;
        };
    }

    if let Some(ref ext) = path.extension().and_then(OsStr::to_str) {
        return extension.iter().any(|x| x.eq_ignore_ascii_case(ext));
    }

    false
}

/// 遍历工作路径下的所有目录文件
fn visit_dirs(dir: PathBuf, cb: &mut dyn FnMut(DirEntry)) -> io::Result<()> {
    match dir.metadata() {
        Ok(_) => {
            for entry in fs::read_dir(dir)? {
                let entry = entry?;
                let path = entry.path();
                if path.is_dir() {
                    visit_dirs(path.to_path_buf(), cb)?;
                } else {
                    cb(entry);
                }
            }
            Ok(())
        }
        Err(err) => Err(err),
    }
}

/// 读取需要压缩的png文件并发送到前端
fn files_info(window: &Window, list: &Vec<(usize, String)>) {
    let mut files_info = vec![];
    for (id, path) in list.iter() {
        let file_name = Path::new(path).file_name().unwrap().to_str().unwrap();
        let file_type = find_mimetype(file_name);
        let base64 = match read_base64(path.to_string()) {
            Ok(base64) => format!("data:{};base64,{}", file_type.to_string(), base64),
            Err(_) => "".to_string(),
        };
        files_info.push((id, file_name, base64, path))
    }
    window.emit("files-info", files_info).unwrap();
}
