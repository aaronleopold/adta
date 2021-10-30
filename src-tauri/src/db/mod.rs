pub mod entities;

extern crate dirs;

use anyhow::Error;
use sea_orm::{
  sea_query::SqliteQueryBuilder, ConnectionTrait, Database, DatabaseBackend, DatabaseConnection,
  Schema, Statement,
};

pub async fn get_connection() -> Result<DatabaseConnection, Error> {
  // let path_buf = dirs::home_dir().unwrap().join(".tauri-todo");

  // std::fs::create_dir_all(path_buf.clone())?;

  let connection = Database::connect("sqlite:/Users/aaronleopold/.adta/adta.db?mode=rwc").await?;
  let create_statement =
    Schema::create_table_from_entity(entities::todo::Entity).to_string(SqliteQueryBuilder);

  match connection
    .execute(Statement::from_string(
      DatabaseBackend::Sqlite,
      create_statement.to_owned(),
    ))
    .await
  {
    Ok(_val) => println!("Created todos table."),
    Err(_err) => println!("Table already exists."),
  };

  Ok(connection)
}
