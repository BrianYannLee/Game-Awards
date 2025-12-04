const NomineeModel = require("../models/NomineeModel")
const GamesModel = require("../models/GamesModel")
const CategoriesModel = require("../models/CategoriesModel")

const getAllNominees = async (req,res) => {
    try {
        const nominees = await NomineeModel.find()
            .populate("game")
            .populate("category")
        res.json(nominees);
    } catch(error) {
      res.status(500).json({ message: error.message });
    }
};

const createNominees = async (req,res) => {

    try{

        const { gameId, categoryId } = req.body;

        const game = await GamesModel.findById(gameId);
        if (!game) {
        return res.status(404).json({ message: "Game not found" });
        }

        const category = await CategoriesModel.findById(categoryId);
        if (!category) {
        return res.status(404).json({ message: "Category not found" });
        }

        const nomineeInput = new NomineeModel({
        game: gameId,
        category: categoryId,
        });

        const newNominee = await nomineeInput.save();
        console.log("✅ New nominee created:", {
      nomineeId: newNominee._id,
      gameId: game._id,
      gameName: game.title,          // assuming your game model has a 'name' field
      categoryId: category._id,
      categoryName: category.name,  // assuming your category model has a 'name' field
    });
        res.status(201).json(newNominee);

    } catch (error) {
    res.status(500).json({ message: error.message });
    } 

};

const updateNominees = async (req,res) => {

    try{

        const { gameId, categoryId, newGameId, newCategoryId } = req.body;

        const newGame = await GamesModel.findById(newGameId);
        if (!newGame) return res.status(404).json({ message: "New game not found" });

        const newCategory = await CategoriesModel.findById(newCategoryId);
        if (!newCategory) return res.status(404).json({ message: "New category not found" });

        const updatedNominee = await NomineeModel.findOneAndUpdate(
        { game: gameId, category: categoryId }, 
        { game: newGameId, category: newCategoryId },
        { new: true }, 
        );

        if (!updatedNominee) {
        return res.status(404).json({ message: "Nominee not found for this game and category combination" });
        }

        res.json(updatedNominee);

    } catch (error) {
    res.status(500).json({ message: error.message });
    } 
};

const deleteNominee = async (req, res) => {
  console.log("delte Nomine Reached")
   try {
    const { id } = req.params; // nominee id from URL
   console.log(`Nominee Id to delete: ${id}`);
    const deleted = await NomineeModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Nominee not found" });
    }

    res.json({ message: "Nominee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAllNominees,
    createNominees,
    updateNominees,
    deleteNominee,
}