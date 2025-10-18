use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Selectable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::poems)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Poem {
    pub id: Option<i32>,
    pub title: String,
    pub author: String,
    pub content: String,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::poems)]
pub struct NewPoem {
    pub title: String,
    pub author: String,
    pub content: String,
}