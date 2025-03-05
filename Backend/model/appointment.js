const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db.js'); 

const Appointment = sequelize.define('Appointment', {
    appointmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {  
        type: DataTypes.INTEGER,
        allowNull: true,
    },
  
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    appointmentTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },

    Address: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    describeProblem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: 'appointments', 
    timestamps: true,  
});

module.exports = Appointment;
