pub mod entities;

extern crate dirs;

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

pub async fn get_connection() -> Result<DatabaseConnection, Error> {
  // let path_buf = dirs::home_dir().unwrap().join(".tauri-todo");

  std::fs::create_dir_all("/Users/aaronleopold/.adta")?;

  let connection = Database::connect("sqlite:/Users/aaronleopold/.adta/adta.db?mode=rwc").await?;
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
