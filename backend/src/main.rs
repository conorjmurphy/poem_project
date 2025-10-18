use std::io::Error;

use poem::{listener::TcpListener, middleware::Cors, http::Method, EndpointExt};
use poem_openapi::{OpenApiService};

mod poem_api;
mod models;
mod schema;
mod database;

#[tokio::main]
async fn main() -> Result<(), Error> {
    let api = OpenApiService::new(poem_api::PoemAPI, "Poem API", "1.0")
        .server("http://localhost:8080/api");
    let ui = api.swagger_ui();
    
    let cors = Cors::new()
        .allow_origin("http://localhost:5173")  // Vite dev server
        .allow_origin("http://localhost:3000")  // Common React port
        .allow_methods(vec![Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_headers(vec!["content-type"]);
    
    let app = poem::Route::new()
        .nest("/api", api)
        .nest("/swagger-ui", ui)
        .with(cors);

    println!("🚀 Server starting on http://localhost:8080");
    println!("📚 API documentation available at http://localhost:8080/swagger-ui");

    poem::Server::new(TcpListener::bind("localhost:8080"))
        .run(app)
        .await
}