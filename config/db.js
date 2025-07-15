const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
require('dotenv').config();



const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
   host: process.env.DB_HOST,
   dialect: 'mysql',
});

module.exports = sequelize;



// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// db.connect((err) => {
//     if(err) {
//         console.log("Database connection failed:", err);
//     } else {
//         console.log("Database connected successfully");
//     }
// });

// module.exports = db;
// This module exports the database connection for use in other parts of the application.