#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use png_libimagequant;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
fn add(l: usize, r: usize) -> usize {
    png_libimagequant::add(l, r)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, add])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
