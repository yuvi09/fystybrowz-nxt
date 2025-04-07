import Database from 'better-sqlite3';
import path from 'path';

// Define path to the SQLite DB file inside the /data folder
const dbPath = path.resolve(process.cwd(), 'data', 'bookings.db');

// Open the database (will auto-create if it doesn't exist)
const db = new Database(dbPath);

// Initialize the "bookings" table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    date TEXT NOT NULL,
    message TEXT
  )
`);

export default db;