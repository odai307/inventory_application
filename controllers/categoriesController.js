const categoriesModel = require("../models/categoriesModel");
const itemsModel = require("../models/itemsModel");


async function listCategories(req, res) {
    try {
        const categories = await categoriesModel.getAllCategories();
        res.render("index", {categories});
    } catch(error) {
        res.render("index", {
            error,
            categories: []
        });
    }
}


function showNewCategoryForm(req, res) {
   res.render("categories/newCategory");
}


async function createNewCategory(req, res) {
    const { name, description } = req.body;
    try {
        await categoriesModel.createCategory(name, description);
    } catch(error) {
        return res.render("categories/newCategory", {error: error.message})
    }
    res.redirect("/");
}

async function listItemsinCategory(req, res) {
    const categoryId = req.params.id;
    try {
        const category = await categoriesModel.getCategoryById(categoryId);
        const items = await itemsModel.getItemsByCategoryId(categoryId);    
        res.render("categories/listItemsInCategory", {category, items})
    } catch(error) {
        return res.status(404).render("categories/newCategory", {error: error.message})
    }
}

async function showEditCategoryForm(req, res) {
    const id = req.params.id;
    try {
        const category = await categoriesModel.getCategoryById(id);
        res.render("categories/updateCategory", { category });
    } catch(error) {
        return res.status(404).send("Cannot update category");
    }
}


async function updateCategory(req, res) {
    const id = req.params.id;
    const { name, description } = req.body;
  
    try {
      await categoriesModel.updateCategory(id, name.trim(), description?.trim());
      res.redirect(`/categories/${id}/items`);
    } catch (error) {
      console.error("Update failed:", error.message);
      res.status(500).render("categories/editCategory", {
        error: error.message,
        category: { id, name, description }
      });
    }
  }
  

async function deleteCategory(req, res) {
    const id = req.params.id;
    await categoriesModel.deleteCategory(id);
    res.redirect("/");
}


async function showCreateItemForm(req, res) {
    const id = req.params.id;
    const category = await categoriesModel.getCategoryById(id);
    res.render("items/newItem", { category });
}


async function createItem(req, res) {
    const categoryId = req.params.id;
    const { name, description, quantity, price } = req.body;
    await itemsModel.createItem(categoryId, name, description, quantity, price);
    res.redirect(`/categories/${categoryId}/items`);

}


module.exports = {
    listCategories,
    showNewCategoryForm,
    createNewCategory,
    listItemsinCategory,
    showEditCategoryForm,
    updateCategory,
    deleteCategory,
    showCreateItemForm,
    createItem
}