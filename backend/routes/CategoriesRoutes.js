const express = require("express");
const CategoriesController = require("../controllers/CategoriesController")
const router = express.Router();

router.get("/",CategoriesController.getAllCategories);
router.get("/:id",CategoriesController.getCategoryByID);
router.post("/",CategoriesController.createCategory);
router.put("/:id",CategoriesController.updateCategory);
router.delete("/:id",CategoriesController.deleteCategory);

module.exports = router;
