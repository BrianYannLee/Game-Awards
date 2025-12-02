
const express = require("express");

const cors = require("cors");


require("dotenv").config();

const mongoose = require("mongoose");

const gameRoutes = require("./routes/GamesRoutes");
const categoryRoutes = require("./routes/CategoriesRoutes");
const nomineeRoutes = require("./routes/NomineesRoutes");

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("Couldn't connect to nomgo ", err));


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
