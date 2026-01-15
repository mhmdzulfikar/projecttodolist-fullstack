const { Sequelize } = require('sequelize');
require('dotenv').config();

// Logic: Kalau ada DATABASE_URL (Online), pakai itu. Kalau gak ada, error.
const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Biar terminal gak berisik
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Wajib buat Neon/Render/Vercel
        }
    }
});

module.exports = db;