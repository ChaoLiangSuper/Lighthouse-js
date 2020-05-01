import _ from 'lodash';
import { Pool } from 'pg';
import { config } from '../config';

export interface Metadata {
  directoryName: string;
  displayName: string;
  fields: {
    [fieldName: string]: {
      defaultValue?: any;
      type: string;
    };
  };
}

export const createMetadataTable = `
  CREATE TABLE IF NOT EXISTS lh_metadata (
    id SERIAL PRIMARY KEY,
    directoryName TEXT UNIQUE NOT NULL,
    displayName TEXT UNIQUE NOT NULL
  );
`;

export const addMetadata = async (tableName: Metadata['displayName'], fields: Metadata['fields']) => {
  const pool = new Pool(config.db);
  try {
    const metadata = await pool.query(
      `
    INSERT INTO lh_metadata (
      directoryName, displayName, fields
    ) VALUES ($1, $2, $3) RETURNING *;
    `,
      [_.snakeCase(tableName), tableName, fields]
    );
    return metadata;
  } catch (err) {
    throw Error(err);
  } finally {
    pool.end();
  }
};
