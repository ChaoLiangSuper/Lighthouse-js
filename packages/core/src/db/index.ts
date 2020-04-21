import _ from 'lodash';
import { Pool } from 'pg';
import { config } from '../config';
import * as sql from './sql';
import { instance } from '../config';
import { Field } from '../type';

const pool = new Pool(config.db);

export const connect = async () => {
  try {
    await pool.connect();
    console.warn(`[${instance.db}]: Connected to database.`);
  } catch (err) {
    console.error(`[${instance.db}]: Unable to connect to database, ${err}`);
  }
};

export const initialize = async () => {
  try {
    await pool.query(sql.initialize);
    console.warn(`[${instance.db}]: Initialized default tables.`);
  } catch (err) {
    console.error(`[${instance.db}]: Initialization error, ${err}`);
  }
};

export const addTestData = async () => {
  try {
    await pool.query(sql.addTestData);
    console.warn(`[${instance.db}]: Test data loaded.`);
  } catch (err) {
    console.error(`[${instance.db}]: Test data load failed. ${err}`);
  }
};

export const createTable = async (tableName: string, fields: Field[]) => {
  const legalTableName = _.snakeCase(tableName);
  try {
    await pool.query('BEGIN');
    await pool.query(sql.createTable(legalTableName, fields));
    await pool.query(sql.insertMetadata, [legalTableName, tableName]);
    await pool.query('COMMIT');
  } catch (err) {
    await pool.query('ROLLBACK');
    throw Error(err);
  }
};

export const getAllUsers = async () => {
  try {
    await pool.query(sql.getAllUsers);
  } catch (err) {
    throw Error(err);
  }
};
