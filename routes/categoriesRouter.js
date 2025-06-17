const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

// GET requests
router.get("/", categoriesController.listCategories);   // List all categories
router.get("/new", categoriesController.showNewCategoryForm); // Form to create a new category
router.get("/:id/items", categoriesController.listItemsinCategory); // List all items in a category
router.get("/:id/edit", categoriesController.showEditCategoryForm); // Form to edit a category
router.get("/:id/items/new", categoriesController.showCreateItemForm); // Form to create a new item in a category


// POST requests
router.post("/", categoriesController.createNewCategory); // Create a new category
router.post("/:id/update", categoriesController.updateCategory); // update a new category
router.post("/:id/delete", categoriesController.deleteCategory); // delete a particular category
router.post("/:id/items", categoriesController.createItem); // Create a new item in a category



module.exports = router;