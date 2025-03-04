const pool = require('../database/db');

const createServiceProviderTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS service_providers (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      address TEXT NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      contact VARCHAR(10) UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `;
  await pool.query(query);
};

createServiceProviderTable();

module.exports = pool;