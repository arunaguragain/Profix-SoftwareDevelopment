const pool = require('../database/db');
const bcrypt = require('bcrypt');

exports.registerServiceProvider = async (req, res) => {
  const { fullName, address, email, contact, password } = req.body;

  if (!fullName || !address || !email || !contact || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO service_providers (full_name, address, email, contact, password) 
                   VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [fullName, address, email, contact, hashedPassword];
    const result = await pool.query(query, values);
    res.status(201).json({ message: 'Registration successful', user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error registering service provider' });
}
};