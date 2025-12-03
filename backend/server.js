
const express = require("express");

const cors = require("cors");


require("dotenv").config();

console.log("CONNECTION_STRING:", process.env.CONNECTION_STRING);


const mongoose = require("mongoose");

const gameRoutes = require("./routes/GamesRoutes");
const categoryRoutes = require("./routes/CategoriesRoutes");
const nomineeRoutes = require("./routes/NomineesRoutes");

const seedDatabase = require("./seed/seed");

const Game = require("./models/GamesModel")

console.log("Attempting MongoDB connection...");
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then( async () => {
    console.log("Connected to mongodb");
    await seedDatabase();

    const games = await Game.find();
    console.log("List of games in database:", games);
  })
  .catch((err) => console.error("Couldn't connect to mongo ", err));


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/games", gameRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/nominees", nomineeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
