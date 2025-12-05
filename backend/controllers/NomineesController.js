const NomineeModel = require("../models/NomineeModel");
const GamesModel = require("../models/GamesModel");
const CategoriesModel = require("../models/CategoriesModel");

// Get all nominees
const getAllNominees = async (req, res) => {
  try {
    const nominees = await NomineeModel.find()
      .populate("game")
      .populate("category");
    res.json(nominees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single nominee by ID
const getNomineeById = async (req, res) => {
  try {
    const { id } = req.params;
    const nominee = await NomineeModel.findById(id)
      .populate("game")
      .populate("category");

    if (!nominee) return res.status(404).json({ message: "Nominee not found" });

    res.json(nominee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new nominee
const createNominees = async (req, res) => {
  try {
    const { gameId, categoryId } = req.body;

    const game = await GamesModel.findById(gameId);
    if (!game) return res.status(404).json({ message: "Game not found" });

    const category = await CategoriesModel.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const newNominee = new NomineeModel({
      game: gameId,
      category: categoryId,
    });

    await newNominee.save();

    console.log("✅ New nominee created:", {
      nomineeId: newNominee._id,
      gameId: game._id,
      gameName: game.title,
      categoryId: category._id,
      categoryName: category.name,
    });

    res.status(201).json(newNominee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update nominee by ID
const updateNominee = async (req, res) => {
  try {
    const { id } = req.params; // nominee ID
    const { gameId, categoryId } = req.body; // new values

    const newGame = await GamesModel.findById(gameId);
    if (!newGame) return res.status(404).json({ message: "New game not found" });

    const newCategory = await CategoriesModel.findById(categoryId);
    if (!newCategory) return res.status(404).json({ message: "New category not found" });

    const updatedNominee = await NomineeModel.findByIdAndUpdate(
      id,
      { game: gameId, category: categoryId },
      { new: true }
    ).populate("game").populate("category");

    if (!updatedNominee) return res.status(404).json({ message: "Nominee not found" });

    res.json(updatedNominee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete nominee
const deleteNominee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await NomineeModel.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Nominee not found" });

    res.json({ message: "Nominee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNominees,
  getNomineeById,      // ✅ new function
  createNominees,
  updateNominee,       // ✅ updated function
  deleteNominee,
};
