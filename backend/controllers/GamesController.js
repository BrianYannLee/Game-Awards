const GameModel = require("../models/GamesModel");

const getAllGames = async (req, res) => {
  try {
    const games = await GameModel.find();

    if (!games) {
      return res.status(404).json({ message: "No games found" });
    }

    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGameByID = async (req, res) => {
  try {
    const game = await GameModel.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGame = async (req, res) => {
  const gameInput = new GameModel(req.body);

  try {
    const newGame = await gameInput.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGame = async (req, res) => {
  try {
    const updatedGame = await GameModel.findByIdAndUpdate(
        req.params.id,
        req.body
    );

    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - Remove game
const deleteGame = async (req, res) => {
  try {
    const deletedGame = await GameModel.findByIdAndDelete(req.params.id);

    if (!deletedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGames,
  getGameByID,
  createGame,
  updateGame,
  deleteGame,
};
