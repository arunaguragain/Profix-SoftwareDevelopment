const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const ServiceProvider = sequelize.define('ServiceProvider', {  
    serviceProviderId: {
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
    profilePicture: {  // ✅ Keeping this field
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'service_providers',  
    timestamps: false,
});

module.exports = ServiceProvider;
