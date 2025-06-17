const pool = require("../db/pool");

// Get ll categories
async function getAllCategories() {
    const result = await pool.query(`SELECT * FROM categories ORDER BY id`);
    return result.rows;
}

// Get a single category by id
async function getCategoryById(id) {
    const result = await pool.query(`SELECT * FROM categories WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
        throw new Error(`A category with an id of ${id} was not found`);
    }
    return result.rows[0];
}

// Create a new category
async function createCategory(name, description) {
    name = name.trim();
    const nameFound = await pool.query(`SELECT name from categories WHERE LOWER(name) = LOWER($1)`, [name]);
    if (nameFound.rows.length > 0) {
        throw new Error(`A category with the name "${name}" already exists`);
    }
    const result = await pool.query(`
        INSERT INTO categories (name, description)
        VALUES ($1, $2) RETURNING *
    `, [name, description]);

    return result.rows[0];
}


// Update a category
async function updateCategory(id, name, description) {
    const result = await pool.query(`
        UPDATE categories SET name = $1, description = $2, updated_at = NOW()
         WHERE id = $3 RETURNING *
        `, [name, description?.trim(), id]);

    return result.rows[0];
}


// Delete a category
async function deleteCategory(id) {
    await pool.query(`
        DELETE FROM categories WHERE id = $1
        `, [id]);
}


module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}