const Game = require("../models/GamesModel");
const Category = require("../models/CategoriesModel");
const Nominee = require("../models/NomineeModel");

async function seedDatabase() {
  try {
    console.log("Seeding database...");

    await Game.deleteMany({});
    await Category.deleteMany({});
    await Nominee.deleteMany({});
    console.log("Existing games, categories, and nominees cleared.");


    // Seed Games
    await Game.create([
      { title: "God of War Ragnarök", developer: "Santa Monica Studio", releaseDate: new Date("2022-11-09") },
      { title: "Elden Ring", developer: "FromSoftware", releaseDate: new Date("2022-02-25") },
      { title: "Baldur's Gate 3", developer: "Larian Studios", releaseDate: new Date("2023-08-03") },
      { title: "Horizon Forbidden West", developer: "Guerrilla Games", releaseDate: new Date("2022-02-18") },
      { title: "Hogwarts Legacy", developer: "Portkey Games", releaseDate: new Date("2023-02-10") },
      { title: "Resident Evil Village", developer: "Capcom", releaseDate: new Date("2021-05-07") },
      { title: "Cyberpunk 2077", developer: "CD Projekt Red", releaseDate: new Date("2020-12-10") },
      { title: "The Legend of Zelda: Tears of the Kingdom", developer: "Nintendo", releaseDate: new Date("2023-05-12") },
      { title: "Starfield", developer: "Bethesda Game Studios", releaseDate: new Date("2023-09-06") },
      { title: "Final Fantasy XVI", developer: "Square Enix", releaseDate: new Date("2023-06-22") }
    ]);

    // Seed Categories
    await Category.create([
      { name: "Best Art Direction", description: "Awarded to the game with outstanding artistic design and visual creativity." },
      { name: "Best Narrative", description: "Recognizes the most compelling storytelling and narrative development." },
      { name: "Best Soundtrack", description: "Awarded for exceptional musical composition and sound design in a game." },
      { name: "Best Multiplayer", description: "Awarded to the game that delivers the most engaging multiplayer experience." },
      { name: "Game of the Year", description: "Recognizes the overall best game, taking all aspects into account." }
    ]);

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

module.exports = seedDatabase;
