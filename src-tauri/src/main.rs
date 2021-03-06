#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod app;
mod commands;
mod db;
mod utils;

use crate::app::menu;
use futures::executor::block_on;
use sea_orm::DatabaseConnection;

pub struct AppState(DatabaseConnection);

fn main() {
  let connection = block_on(db::get_connection()).unwrap();

  tauri::Builder::default()
    .manage(AppState(connection))
    .invoke_handler(tauri::generate_handler![
      commands::test_connection,
      commands::get_todos,
      commands::delete_todo,
      commands::set_todo_status,
      commands::set_todo_text,
      commands::insert_todo,
    ])
    .menu(menu::get_menu())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
