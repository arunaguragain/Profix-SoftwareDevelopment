const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Inquiry = sequelize.define('Inquiry', {
    inquiryID: {
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
    subject: {
        type: DataTypes.STRING,
        allowNull: false

    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
<<<<<<< HEAD
    }
}, {
=======
    },
},
 {
>>>>>>> 53e59d043c89b27df447502411cfc6687531ce5c
    tableName: 'Inquiries',
    timestamps: true  // This will add createdAt and updatedAt automatically
});

module.exports = Inquiry;