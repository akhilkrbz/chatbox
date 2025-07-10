const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if(err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Database connected successfully");
    }
});

module.exports = db;
// This module exports the database connection for use in other parts of the application.