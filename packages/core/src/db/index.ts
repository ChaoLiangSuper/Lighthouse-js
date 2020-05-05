import { Pool } from 'pg';
import { config, instance } from '../config';
import { testData } from './testData';
import { createMetadataTable } from '../models/metadata';
import { createUserTable } from '../models/user';
import { createRecordDataTable } from '../models/recordData';

const pool = new Pool(config.db);

export const connect = async () => {
  try {
    await pool.connect();
    console.warn(`[${instance.db}]: Connected to database.`);
  } catch (err) {
    console.error(`[${instance.db}]: Unable to connect to database, ${err}`);
  }
};

export const initialize = async (force?: boolean) => {
  try {
    if (force) {
      await pool.query(`
        DO $$ DECLARE
          r RECORD;
        BEGIN
          FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
            EXECUTE 'DROP TABLE ' || quote_ident(r.tablename) || ' CASCADE';
          END LOOP;
        END $$;
      `);
    }
    await pool.query(`
      ${createUserTable}
      ${createMetadataTable}
      ${createRecordDataTable}
    `);
    console.warn(`[${instance.db}]: Initialized default tables.`);
  } catch (err) {
    console.error(`[${instance.db}]: Initialization error, ${err}`);
  }
};

export const addTestData = async () => {
  try {
    await pool.query(`${testData}`);
    console.warn(`[${instance.db}]: Test data loaded.`);
  } catch (err) {
    console.error(`[${instance.db}]: Test data load failed. ${err}`);
  }
};
