import { Client } from 'pg';

const client = new Client({
  user: process.env.DB_USER || 'lighthouse',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'lighthouse',
  password: process.env.DB_PASS || 'admin'
});

export const connect = async () => {
  try {
    await client.connect();
    console.warn('[DB]: Connected to database.');
  } catch (err) {
    console.warn(`[DB]: Unable to connect to database, ${err}`);
  }
};
