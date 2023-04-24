#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod compression;
use tauri::Manager;
use window_shadows::set_shadow;
use compression::compression_handle;

// #[tauri::command]
// fn handle(list: Vec<String>) {
//     println!("{:#?}", list);
//     let mut worklist: Vec<Work> = vec![];
//     for (i, f) in list.iter().enumerate() {
//         let path = Path::new(f).to_path_buf();
//         worklist.push(Work {
//             id: i,
//             path: path,
//             status: WorkStatus::INIT,
//             progress: 0,
//             original_size: 0,
//             size: 0,
//         })
//     }

//     let mut optimization = Optimization::new(None, None, None, None, None, &mut worklist);
//     optimization.run_worklist();
// }

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![compression_handle])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
