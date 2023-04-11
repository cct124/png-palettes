#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;
use png_libimagequant;
use window_shadows::set_shadow;

fn handle() {
    // png_libimagequant::Optimization::new(
    //     speed,
    //     quality_minimum,
    //     quality_target,
    //     dithering_level,
    //     compression,
    //     exclude,
    //     worklist,
    // )
}

// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}!", name)
// }

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
