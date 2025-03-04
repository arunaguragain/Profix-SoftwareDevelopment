const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db.js'); // Ensure this path is correct

const Appointment = sequelize.define('Appointment', {
    appointmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {  // Assuming you have a User model
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    // serviceProviderId: {  // Refers to the ServiceProvider model
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
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
        allowNull: true, // Can be pending, confirmed, cancelled, etc.
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
    tableName: 'appointments',  // The name of your table
    timestamps: true,  // If you want automatic `createdAt` and `updatedAt` fields
});

// Establish relationships (if needed)
// For example, one-to-many relationship with ServiceProvider
// Appointment.belongsTo(ServiceProvider, { foreignKey: 'serviceProviderId' });

module.exports = Appointment;
