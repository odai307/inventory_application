const pool = require("../db/pool");

// Get all items
async function getAllItems() {
    const result = await pool.query(`SELECT * FROM items ORDER BY id`);
    return result.rows;
}

// Get all items within a category
async function getItemsByCategoryId(categoryId) {
    const result = await pool.query(`SELECT * FROM items WHERE category_id = $1 ORDER BY id`, [categoryId]);
    return result.rows;
}

// Get a single item by id
async function getItemById(id) {
    const result = await pool.query(`SELECT * FROM items WHERE id = $1`, [id]);
    return result.rows[0];
}

// Create a new item in a category
async function createItem(categoryId, name, description, quantity, price) {
    const result = await pool.query(`INSERT INTO items (category_id, name, description, quantity, price)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`, [categoryId, name, description, quantity, price]);
    return result.rows[0];
}

// Updates an item
async function updateItem(id, name, description, quantity, price) {
        const result = await pool.query(`UPDATE items
            SET name = $1, description = $2, quantity = $3, price = $4
            WHERE id = $5 RETURNING *`,
        [name, description, quantity, price, id]);
        return result.rows[0];
}

// Deletes an item
async function deleteItem(id) {
    await pool.query(`DELETE FROM items WHERE id = $1`, [id]);
}


module.exports = {
    getAllItems,
    getItemsByCategoryId,
    getItemById,
    createItem,
    updateItem,
    deleteItem
}