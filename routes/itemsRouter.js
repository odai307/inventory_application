const express = require("express");
const router = express.Router();

const itemsController = require("../controllers/itemsController");

// GET requests
// router.get("/"); // view all items under every category
router.get("/:id", itemsController.showItemDetails);  // View an item details
router.get("/:id/update", itemsController.showUpdateItems)  // View form to update items


// // POST requests
router.post("/:id/update", itemsController.updateItem); // Update an item
router.post("/:id/delete", itemsController.deleteItem); // Delete an item

module.exports = router;