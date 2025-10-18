use std::io::Error;

use poem::listener::TcpListener;
use poem_openapi::{OpenApiService};

mod poem_api;
mod models;
mod schema;
mod database;

#[tokio::main]
async fn main() -> Result<(), Error> {
    let api = OpenApiService::new(poem_api::PoemAPI, "Poem API", "1.0")
        .server("http://127.0.0.1:8080/api");
    let ui = api.swagger_ui();
    let app = poem::Route::new()
        .nest("/api", api)
        .nest("/swagger-ui", ui);

    println!("🚀 Server starting on http://127.0.0.1:8080");
    println!("📚 API documentation available at http://127.0.0.1:8080/swagger-ui");

    poem::Server::new(TcpListener::bind("127.0.0.1:8080"))
        .run(app)
        .await
}