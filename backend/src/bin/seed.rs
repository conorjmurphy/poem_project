use diesel::prelude::*;
use fake::faker::lorem::en::{Words, Sentence};
use fake::Fake;
use rand::Rng;
use rand::seq::SliceRandom;

// Import from the main crate
use poem_project::database::establish_connection;
use poem_project::models::NewPoem;
use poem_project::schema::poems;

fn main() {
    let mut connection = establish_connection()
        .expect("Failed to establish database connection");

    println!("🌱 Starting database seeding...");

    // Define the 20 author names
    let authors = vec![
        "Conor",
        "Hollie",
        "Emma",
        "Liam",
        "Olivia",
        "Noah",
        "Sophia",
        "Mason",
        "Isabella",
        "James",
        "Ava",
        "Logan",
        "Mia",
        "Ethan",
        "Charlotte",
        "Lucas",
        "Amelia",
        "Alexander",
        "Harper",
        "Benjamin",
    ];

    let mut rng = rand::thread_rng();
    let num_poems = 10_000;

    println!("📝 Creating {} poems...", num_poems);

    for i in 1..=num_poems {
        // Random title: 3-5 words
        let title_length = rng.gen_range(3..=5);
        let title_words: Vec<String> = Words(title_length..title_length+1).fake();
        let title = title_words.join(" ");
        
        // Random author from the list
        let author = authors.choose(&mut rng).unwrap().to_string();
        
        // Generate poem content: 5-15 random sentences
        let num_sentences = rng.gen_range(5..=15);
        let mut sentences = Vec::new();
        for _ in 0..num_sentences {
            let sentence: String = Sentence(5..12).fake();
            sentences.push(sentence);
        }
        let content = sentences.join(" ");

        let new_poem = NewPoem {
            title,
            author: author.clone(),
            content,
        };

        diesel::insert_into(poems::table)
            .values(&new_poem)
            .execute(&mut connection)
            .expect("Failed to insert poem");

        if i % 1000 == 0 {
            println!("✅ Created {}/{} poems...", i, num_poems);
        }
    }

    println!("🎉 Database seeding completed! Created {} poems", num_poems);
}
