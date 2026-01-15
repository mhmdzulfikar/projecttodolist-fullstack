const { Sequelize } = require('sequelize');

// LINK DB BERSIH (Tanpa channel_binding)
// Ini sudah gue sesuaikan sama punya lu. Langsung copas aja.
const db = new Sequelize('postgresql://neondb_owner:npg_4LyVuErGcqS1@ep-bold-haze-a1vqhfhi-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require', {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = db;