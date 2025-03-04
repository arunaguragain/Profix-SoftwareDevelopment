const { Sequelize } = require("sequelize");

// Use an in-memory SQLite database for testing instead of PostgreSQL
const sequelize = new Sequelize("sqlite::memory:", {
    logging: false, // Disable logging for cleaner test output
});

module.exports = sequelize;
