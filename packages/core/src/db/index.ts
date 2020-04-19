import _ from 'lodash';
import { Client } from 'pg';
import * as sql from './sql';
import { instance } from '../config';
import { Field } from '../type';

const client = new Client({
  user: process.env.DB_USER || 'lighthouse',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'lighthouse',
  password: process.env.DB_PASS || 'admin'
});

export const connect = async () => {
  try {
    await client.connect();
    console.warn(`[${instance.db}]: Connected to database.`);
  } catch (err) {
    console.error(`[${instance.db}]: Unable to connect to database, ${err}`);
  }
};

export const initialize = async () => {
  try {
    await client.query(sql.initialize);
    console.warn(`[${instance.db}]: Initialized default tables.`);
  } catch (err) {
    console.error(`[${instance.db}]: Initialization error, ${err}`);
  }
};

export const addTestData = async () => {
  try {
    await client.query(sql.addTestData);
    console.warn(`[${instance.db}]: Test data loaded.`);
  } catch (err) {
    console.error(`[${instance.db}]: Test data load failed. ${err}`);
  }
};

export const createTable = async (tableName: string, fields: Field[]) => {
  const legalTableName = _.snakeCase(tableName);
  try {
    await client.query('BEGIN');
    await client.query(sql.createTable(legalTableName, fields));
    await client.query(sql.insertMetadata, [legalTableName, tableName]);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw Error(err);
  }
};
