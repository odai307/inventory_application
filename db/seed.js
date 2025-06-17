const pool = require("./pool");
require("dotenv").config();


async function seed() {
    console.log("Seeding database");
    try {
        await pool.query(`DROP TABLE IF EXISTS items`);
        await pool.query(`DROP TABLE IF EXISTS categories`);


        await pool.query(`
            CREATE TABLE categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            description TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE TABLE items(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            description TEXT,
            quantity INTEGER NOT NULL DEFAULT 0,
            price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
            category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            );
        `);

        // Insert some seed categories
        const categories = ["Gadgets", "Furniture", "Clothes"];
        for (let category of categories) {
            await pool.query(`INSERT INTO categories(name) VALUES ($1)`, [category]);
        }

        // Insert some seed items
        await pool.query(`
            INSERT INTO items(name, description, quantity, price, category_id)
            VALUES
             ('Laser pen', 'A pen that shoots lasers', 5, 10.00, 1),
             ('Sivel Chair', 'A comfortable chair', 3, 49.99, 2),
             ('Nike shirt', 'A designer shirt', 20, 20.99, 3);
            `);

        console.log("Database seeded successfully");
    } catch(err) {
        console.error("Seeding failed", err);
    } finally {
        await pool.end();
    }
}

seed();