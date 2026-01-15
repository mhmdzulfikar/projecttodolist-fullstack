const { Sequelize } = require('sequelize');

// KONEKSI DATABASE (Versi Hardcode untuk Debugging)
// Ini link asli lu yang udah dibersihin. Jangan diubah-ubah dulu.
const db = new Sequelize('postgresql://neondb_owner:npg_4LyVuErGcqS1@ep-bold-haze-a1vqhfhi-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', {
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