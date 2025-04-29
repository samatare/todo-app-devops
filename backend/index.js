const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const connectWithRetry = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        task TEXT NOT NULL
      )
    `);
    console.log('✅ Connected to DB and ensured table exists.');
  } catch (err) {
    console.error('❌ Failed to connect to DB. Retrying...', err.message);
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.post('/todos', async (req, res) => {
  const { task } = req.body;
  try {
    const result = await pool.query('INSERT INTO todos (task) VALUES ($1) RETURNING *', [task]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`🟢 Backend listening on http://0.0.0.0:${process.env.PORT}`);
});

