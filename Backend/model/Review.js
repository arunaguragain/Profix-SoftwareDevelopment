const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const User = require("./User");

const Review = sequelize.define('Review', {
    reviewID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {  
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    service: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comment: {  
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'Reviews',
    timestamps: true
});

module.exports = Review;
