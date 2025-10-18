use diesel::{Connection, SqliteConnection, ConnectionError};
use std::env;
use dotenvy::dotenv;

pub fn establish_connection() -> Result<SqliteConnection, ConnectionError> {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .unwrap_or_else(|_| "db.sqlite".to_string());
    SqliteConnection::establish(&database_url)
}