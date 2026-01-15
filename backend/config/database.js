const { Sequelize } = require('sequelize');
require('dotenv').config();

// Logic: Kalau ada DATABASE_URL (Online), pakai itu. Kalau gak ada, error.
const db = new Sequelize('postgresql://neondb_owner:.....@ep-bold-....aws.neon.tech/neondb?sslmode=require', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = db;