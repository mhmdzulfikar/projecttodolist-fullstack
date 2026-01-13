const { Sequelize } = require('sequelize');
require('dotenv').config();

// Pastikan kamu sudah buat database kosong bernama 'todolist_db' di pgAdmin/Postgres kamu
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false // Biar terminal ga berisik sama log SQL
});

module.exports = db;