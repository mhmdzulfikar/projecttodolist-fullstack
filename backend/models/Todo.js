const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Todo = db.define('Todo', {
    task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isXpGiven: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
        allowNull: false
    }
}, {
    freezeTableName: true 
});

module.exports = Todo;