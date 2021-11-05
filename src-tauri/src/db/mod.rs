pub mod entities;

extern crate dirs;

use std::path::PathBuf;

use super::utils::date;
use anyhow::Result;
use entities::todo;

use sea_orm::{
  sea_query::SqliteQueryBuilder, ConnectionTrait, Database, DatabaseBackend, DatabaseConnection,
  EntityTrait, Schema, Set, Statement,
};

async fn create_default_todos(connection: &DatabaseConnection) -> Result<(), String> {
  let date_created = date::get_naive_date();

  let todo_one = todo::ActiveModel {
    text: Set("This is a to-do!".to_owned()),
    done: Set(false),
    date_created: Set(Some(date_created)),
    ..Default::default()
  };

  let todo_two = todo::ActiveModel {
    text: Set("Click the checkmark to complete a todo".to_owned()),
    done: Set(false),
    date_created: Set(Some(date_created)),
    ..Default::default()
  };

  let todo_three = todo::ActiveModel {
    text: Set("Double click to edit the text, then escape to cancel or enter to save".to_owned()),
    done: Set(false),
    date_created: Set(Some(date_created)),
    ..Default::default()
  };

  let todo_four = todo::ActiveModel {
    text: Set("Swipe a todo to the left to delete it".to_owned()),
    done: Set(false),
    date_created: Set(Some(date_created)),
    ..Default::default()
  };

  let todo_five = todo::ActiveModel {
    text: Set("Have fun!".to_owned()),
    done: Set(false),
    date_created: Set(Some(date_created)),
    ..Default::default()
  };

  todo::Entity::insert_many(vec![todo_one, todo_two, todo_three, todo_four, todo_five])
    .exec(connection)
    .await
    .map_err(|e| e.to_string())?;

  Ok(())
}

fn create_adta_folder() -> Result<PathBuf, String> {
  let home_dir = dirs::home_dir();

  match home_dir {
    Some(home_dir) => {
      let db_dir = home_dir.join(".adta");
      std::fs::create_dir_all(&db_dir).map_err(|e| e.to_string())?;
      Ok(db_dir)
    }
    None => Err("Could not get home directory".to_owned()),
  }
}

pub async fn get_connection() -> Result<DatabaseConnection, String> {
  let adta_folder = create_adta_folder()?;

  let db = format!(
    "sqlite:{}?mode=rwc",
    adta_folder.join("adta.db").to_str().unwrap()
  );

  let connection = Database::connect(db).await.map_err(|e| e.to_string())?;
  let create_statement =
    Schema::create_table_from_entity(todo::Entity).to_string(SqliteQueryBuilder);

  let created = connection
    .execute(Statement::from_string(
      DatabaseBackend::Sqlite,
      create_statement.to_owned(),
    ))
    .await;

  // this means the create statement worked, and the default to-dos should
  // be added
  if created.is_ok() {
    create_default_todos(&connection).await?;
  }

  Ok(connection)
}
