const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const dbConfig = require('./dbConfig'); // Import the database configuration

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// POST endpoint to write data to the MySQL database
app.post('/api/coupon/add', async (req, res) => {
    try {
        // Extract data from the request body
        const {
            name, // "-10% Discount"
            code, // "SALE10"
            discount, // 10.0
            shipping, // 0
            total, // 0.0
            date_start, // 2024-03-03
            date_end, // 2024-04-04
            uses_total // 10
        } = req.body;

        // Set default values for status, uses_customer, type, logged, and date_added
        const status = 1;
        const uses_customer = 0;
        const type = 'P';
        const logged = 0;
        const date_added = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS

        // Get a connection from the pool
        const connection = await pool.getConnection();

        // Insert the data into the database
        await connection.query(
            'INSERT INTO oc_coupon (name, code, type, discount, logged, shipping, total, date_start, date_end, uses_total, uses_customer, status, date_added) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, code, type, discount, logged, shipping, total, date_start, date_end, uses_total, uses_customer, status, date_added]
        );

        // Release the connection back to the pool
        connection.release();

        // Respond with a success message
        res.status(201).json({ message: 'Data written successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error', description: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
