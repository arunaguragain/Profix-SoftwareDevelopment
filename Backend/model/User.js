const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const User = sequelize.define('Users', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'Users',
    timestamps: false,
});

module.exports = User;
