const CategoriesModel = require("../models/CategoriesModel");

const getAllCategories = async (req, res) => {
  try {
   
    const categoryList = await CategoriesModel.find();

    if (!categoryList) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    res.json(categoryList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getCategoryByID = async (req, res) => {
  try {
    const categoryById = await CategoriesModel.findById(req.params.id);
    
    if (!categoryById) {
      return res.status(404).json({ message: "Category not found" });
    }
  
    res.json(categoryById);
  } catch (error) {
    res.status(500).message({ mesasge: error.message });
  }
};


const createCategory = async (req, res) => {
 
  const categoryInput = new CategoriesModel(req.body);

  try {
    const newCategory = await categoryInput.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).message({ mesasge: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {

    const categoryUpdateById = await CategoriesModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.json(categoryUpdateById);
  } catch (error) {
    res.status(500).message({ mesasge: error.message });
  }
};


const deleteCategory = async (req, res) => {
  try {
    await CategoriesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Category Deleted" });
  } catch (error) {
    res.status(500).message({ mesasge: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryByID,
  createCategory,
  updateCategory,
  deleteCategory,
};
