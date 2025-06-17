const itemsModel = require("../models/itemsModel");

async function showItemDetails(req, res) {
    const id = req.params.id;
    const item = await itemsModel.getItemById(id);
    res.render("items/itemDetails", { item });
}

async function showUpdateItems(req, res) {
    const id = req.params.id;
    const item = await itemsModel.getItemById(id);
    res.render("items/updateItem", { item })
}


async function updateItem(req, res) {
    const id = req.params.id;
    const item = await itemsModel.getItemById(id);
    const { name, description, quantity, price } = req.body;
    await itemsModel.updateItem(id, name, description, quantity, price);
    res.redirect(`/categories/${item.category_id}/items`);
}

async function deleteItem(req, res) {
    const id = req.params.id;
    const item = await itemsModel.getItemById(id);
    await itemsModel.deleteItem(id);
    res.redirect(`/categories/${item.category_id}/items`);
}

module.exports = {
     showItemDetails,
     showUpdateItems,
     updateItem,
     deleteItem
}