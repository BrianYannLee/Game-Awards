const Game = require("../models/GamesModel");
const Category = require("../models/CategoriesModel");

async function seedDatabase() {
  try {
    console.log("Seeding database...");

    const gameCount = await Game.countDocuments();
    const categoryCount = await Category.countDocuments();

    if (gameCount > 0 || categoryCount > 0) {
      console.log("Database already has data. Skipping seed.");
      return; 
    }

    await Game.create([
    {
        title: "God of War Ragnarök",
        developer: "Santa Monica Studio",
        releaseDate: new Date("2022-11-09")
    },
    {
        title: "Elden Ring",
        developer: "FromSoftware",
        releaseDate: new Date("2022-02-25")
    },
    {
        title: "Baldur's Gate 3",
        developer: "Larian Studios",
        releaseDate: new Date("2023-08-03")
    }
    ]);

    await Category.create([
      {
        name: "Best Art Direction",
        description: "Awarded to the game with outstanding artistic design and visual creativity."
      },
      {
        name: "Best Narrative",
        description: "Recognizes the most compelling storytelling and narrative development."
      },
      {
        name: "Best Soundtrack",
      }
    ]);

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

module.exports = seedDatabase;
