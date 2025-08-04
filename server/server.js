const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./Routes/authRoutes');
const taskRoutes = require('./Routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
const db = new sqlite3.Database('./db.sqlite3', (err) => {
  if (err) console.error('DB connection error', err);
  else console.log('Connected to SQLite DB');
});

// Tables Creation
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userName TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  password TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  status TEXT DEFAULT 'active',
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);

// Routes...
app.use('/api', authRoutes(db));
app.use('/api/tasks', taskRoutes(db));

app.get('/', (req, res) => {
  res.send('API is Running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
