use poem_openapi::{Object, OpenApi, payload::Json, param::Path, ApiResponse};
use crate::models::{Poem, NewPoem};
use crate::database::establish_connection;

pub struct PoemAPI;

// This is the API response struct that implements the OpenAPI Object derive
#[derive(Object)]
struct PoemResponse {
    id: Option<i32>,
    title: String,
    author: String,
    content: String,
}

// Request struct for creating new poems
#[derive(Object)]
struct CreatePoemRequest {
    title: String,
    author: String,
    content: String,
}

// Convert from the Diesel model to the API response
impl From<Poem> for PoemResponse {
    fn from(poem: Poem) -> Self {
        PoemResponse {
            id: poem.id,
            title: poem.title,
            author: poem.author,
            content: poem.content,
        }
    }
}

#[derive(ApiResponse)]
enum PoemApiResponse {
    #[oai(status = 200)]
    Ok(Json<PoemResponse>),
    #[oai(status = 404)]
    NotFound,
    #[oai(status = 500)]
    InternalServerError,
}

#[derive(ApiResponse)]
enum PoemsApiResponse {
    #[oai(status = 200)]
    Ok(Json<Vec<PoemResponse>>),
    #[oai(status = 500)]
    InternalServerError,
}

#[derive(ApiResponse)]
enum CreatePoemApiResponse {
    #[oai(status = 201)]
    Created(Json<PoemResponse>),
    #[oai(status = 500)]
    InternalServerError,
}

#[OpenApi]
impl PoemAPI {
    #[oai(path = "/poems/:id", method = "get")]
    async fn get_poem_by_id(&self, id: Path<i32>) -> PoemApiResponse {
        use diesel::prelude::*;
        
        let connection = &mut match establish_connection() {
            Ok(conn) => conn,
            Err(_) => return PoemApiResponse::InternalServerError,
        };
        
        match crate::schema::poems::table
            .filter(crate::schema::poems::id.eq(id.0))
            .first::<Poem>(connection) {
            Ok(poem) => PoemApiResponse::Ok(Json(poem.into())),
            Err(diesel::result::Error::NotFound) => PoemApiResponse::NotFound,
            Err(_) => PoemApiResponse::InternalServerError,
        }
    }

    #[oai(path = "/poems", method = "get")]
    async fn get_all_poems(&self) -> PoemsApiResponse {
        use diesel::prelude::*;
        use crate::schema::poems::dsl::*;
        
        let connection = &mut match establish_connection() {
            Ok(conn) => conn,
            Err(_) => return PoemsApiResponse::InternalServerError,
        };
        
        match poems.load::<Poem>(connection) {
            Ok(results) => {
                let poem_responses: Vec<PoemResponse> = results.into_iter().map(|p| p.into()).collect();
                PoemsApiResponse::Ok(Json(poem_responses))
            },
            Err(_) => PoemsApiResponse::InternalServerError,
        }
    }

    #[oai(path = "/poems", method = "post")]
    async fn create_poem(&self, request: Json<CreatePoemRequest>) -> CreatePoemApiResponse {
        use diesel::prelude::*;
        use crate::schema::poems;
        
        let connection = &mut match establish_connection() {
            Ok(conn) => conn,
            Err(_) => return CreatePoemApiResponse::InternalServerError,
        };
        
        let new_poem = NewPoem {
            title: request.title.clone(),
            author: request.author.clone(),
            content: request.content.clone(),
        };
        
        // Insert the poem and then query for it since SQLite doesn't support RETURNING
        match diesel::insert_into(poems::table)
            .values(&new_poem)
            .execute(connection) {
            Ok(_) => {
                // Get the last inserted poem
                match poems::table
                    .order(poems::id.desc())
                    .first::<Poem>(connection) {
                    Ok(poem) => CreatePoemApiResponse::Created(Json(poem.into())),
                    Err(_) => CreatePoemApiResponse::InternalServerError,
                }
            },
            Err(_) => CreatePoemApiResponse::InternalServerError,
        }
    }
}