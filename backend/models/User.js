const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
    }, 
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    xp: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    freezeTableName: true
});

module.exports = User;