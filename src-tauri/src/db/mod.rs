pub mod entities;

extern crate dirs;

use std::path::PathBuf;

use super::utils::date;
use entities::todo;

use anyhow::Error;
use sea_orm::{
  sea_query::SqliteQueryBuilder, ConnectionTrait, Database, DatabaseBackend, DatabaseConnection,
  EntityTrait, Schema, Set, Statement,
};

// FIXME: error handling
async fn create_default_todos(connection: &DatabaseConnection) {
  let date_created = date::get_naive_date();

  let todo_one = todo::ActiveModel {
    text: Set("This is a todo!".to_owned()),
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
    text: Set("Double click to edit the text".to_owned()),
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
    .await;
}

fn create_adta_folder() -> Result<PathBuf, Error> {
  let home_dir = dirs::home_dir().ok_or(anyhow::anyhow!("Could not find home directory"))?;
  let db_dir = home_dir.join(".adta");
  std::fs::create_dir_all(&db_dir)?;
  Ok(db_dir)
}

pub async fn get_connection() -> Result<DatabaseConnection, Error> {
  let adta_folder = create_adta_folder()?;

  let db = format!(
    "sqlite:{}?mode=rwc",
    adta_folder.join("adta.db").to_str().unwrap()
  );

  let connection = Database::connect(db).await?;
  let create_statement =
    Schema::create_table_from_entity(todo::Entity).to_string(SqliteQueryBuilder);

  match connection
    .execute(Statement::from_string(
      DatabaseBackend::Sqlite,
      create_statement.to_owned(),
    ))
    .await
  {
    Ok(_val) => create_default_todos(&connection).await,
    Err(_err) => println!("Table already exists."),
  };

  Ok(connection)
}
