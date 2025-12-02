const express = require("express");
const GamesController = require("../controllers/GamesController");
const router = express.Router();

router.get("/",GamesController.getAllGames);
router.get("/:id",GamesController.getGameByID);
router.post("/",GamesController.createGame);
router.put("/:id",GamesController.updateGame);
router.delete("/:id",GamesController.deleteGame);

module.exports = router;