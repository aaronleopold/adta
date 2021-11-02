use super::db::entities::todo;
use super::AppState;

use chrono::{NaiveDateTime, Utc};
use futures::executor::block_on;
use sea_orm::entity::prelude::*;
use sea_orm::{Set, Unset};
use tauri::Manager;

fn get_naive_date() -> NaiveDateTime {
  let dt = Utc::now();
  let timestamp_seconds = dt.timestamp();
  let timestamp_nano = dt.timestamp_subsec_nanos();

  NaiveDateTime::from_timestamp(timestamp_seconds, timestamp_nano)
}

#[tauri::command(async)]
pub async fn test_connection(app: tauri::AppHandle) -> Result<(), String> {
  match block_on(super::db::get_connection()) {
    Err(err) => Err(format!("{:?}", err)),
    _ => Ok(()),
  }
}

#[tauri::command(async)]
pub async fn get_todos(app: tauri::AppHandle) -> Result<Vec<todo::Model>, String> {
  let state = app.state::<AppState>();
  let connection = &state.0;

  match todo::Entity::find().all(connection).await {
    Ok(todos) => Ok(todos),
    Err(err) => Err(format!("{:?}", err)),
  }
}

// this should return the model, but I can't figure out how to get Model
// from ActiveModel. So, for now it returns the id
#[tauri::command(async)]
pub async fn insert_todo(app: tauri::AppHandle, text: String) -> Result<i32, String> {
  let date_created = get_naive_date();

  let new_todo = todo::ActiveModel {
    text: Set(text),
    done: Set(false),
    date_created: Set(Some(date_created)),
    ..Default::default()
  };

  let state = app.state::<AppState>();
  let connection = &state.0;

  let res = todo::Entity::insert(new_todo).exec(connection).await;

  match res {
    Ok(val) => Ok(val.last_insert_id),
    Err(err) => Err(format!("{:?}", err)),
  }
}

#[tauri::command(async)]
pub async fn set_todo_status(app: tauri::AppHandle, id: i32, done: bool) -> Result<(), String> {
  let date = get_naive_date();

  let state = app.state::<AppState>();
  let connection = &state.0;

  let model = todo::Entity::find_by_id(id).one(connection).await;

  let mut active_model: todo::ActiveModel = match model {
    Ok(val) => val.unwrap().into(),
    Err(err) => return Err(format!("{:?}", err)),
  };

  active_model.done = Set(done);

  if done {
    active_model.date_completed = Set(Some(date));
  } else {
    active_model.date_completed = Unset(None);
  }

  match active_model.update(connection).await {
    Ok(_val) => Ok(()),
    Err(err) => Err(format!("{:?}", err)),
  }
}
