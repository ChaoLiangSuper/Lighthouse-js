import { Pool } from 'pg';
import { config } from '../config';

const TABLE_NAME = 'lh_users';

export interface User {
  username: string;
  password: string;
  phone?: string;
  permissions: string[];
}

export const createUserTable = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone TEXT,
  permissions JSON
);`;

export const getAllUsers = async () => {
  const pool = new Pool(config.db);
  try {
    await pool.query(`SELECT * FROM ${TABLE_NAME}`);
  } catch (err) {
    throw Error(err);
  } finally {
    pool.end();
  }
};

export const getUser = async (username: User['username']) => {
  const pool = new Pool(config.db);
  try {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE username = $1`, [username]);
    return rows[0] as User;
  } catch (err) {
    throw Error(err);
  } finally {
    pool.end();
  }
};

export const addUser = async (username: User['username'], password: User['password']) => {
  const pool = new Pool(config.db);
  try {
    const { rows, rowCount } = await pool.query(
      `
      INSERT INTO ${TABLE_NAME} (
        username, password, permissions
      ) VALUES ($1, $2, []) RETURNING *
    `,
      [username, password]
    );
    return {
      data: rows,
      rowCount
    };
  } catch (err) {
    throw Error(err);
  } finally {
    pool.end();
  }
};
