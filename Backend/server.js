require('dotenv').config(); 

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Get all cylinders
app.get('/api/cylinders', (req, res) => {
    const query = 'SELECT * FROM cylinders';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ✅ Get a single cylinder by ID (needed for UpdateStatus)
app.get('/api/cylinders/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM cylinders WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Cylinder not found' });
        res.json(results[0]);
    });
});

// ✅ Update cylinder (current_status and warehouse)
app.put('/api/cylinders/:id', (req, res) => {
    const { current_status, warehouse } = req.body;
    const { id } = req.params;

    const query = `
        UPDATE cylinders 
        SET current_status = ?, warehouse = ?
        WHERE id = ?
    `;
    db.query(query, [current_status, warehouse, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cylinder updated successfully' });
    });
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
