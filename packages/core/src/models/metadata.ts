import _ from 'lodash';
import { Pool } from 'pg';
import { config } from '../config';
import { fieldMetadata } from '../types';

const TABLE_NAME = 'lh_metadata';

export interface Metadata {
  directoryName: string;
  fields: {
    [fieldName: string]: fieldMetadata;
  };
}

export const createMetadataTable = `
  CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    id SERIAL PRIMARY KEY,
    directoryName TEXT UNIQUE NOT NULL,
    fields JSON
  );
`;

export const getAllMetadata = async () => {
  const pool = new Pool(config.db);
  try {
    const { rows, rowCount } = await pool.query(`SELECT * FROM ${TABLE_NAME};`);
    return {
      data: rows,
      rowCount
    };
  } finally {
    pool.end();
  }
};

export const getOneMetadata = async (directoryId: string) => {
  const pool = new Pool(config.db);
  try {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1;`, [directoryId]);
    return rows[0];
  } finally {
    pool.end();
  }
};

export const addMetadata = async (directoryName: Metadata['directoryName'], fields: Metadata['fields']) => {
  const pool = new Pool(config.db);
  try {
    const { rows } = await pool.query(
      `
      INSERT INTO ${TABLE_NAME} (
        directoryName, fields
      ) VALUES ($1, $2) RETURNING *;
    `,
      [directoryName, fields]
    );
    return rows[0];
  } finally {
    pool.end();
  }
};

export const updateMetadata = async (
  directoryId: string,
  directoryName?: Metadata['directoryName'],
  fields?: Metadata['fields']
) => {
  let fieldIndex = 1;
  const fieldTexts: string[] = [];
  const fieldValues: (string | Metadata['directoryName'] | Metadata['fields'])[] = [];

  _.forEach(
    {
      directoryName,
      fields
    },
    (fieldValue, key) => {
      if (fieldValue) {
        fieldTexts.push(`${key} = $${fieldIndex}`);
        fieldValues.push(fieldValue);
        fieldIndex++;
      }
    }
  );

  if (fieldTexts.length === 0) {
    throw 'directoryName and fields are both empty';
  }

  const pool = new Pool(config.db);
  const query = `
    UPDATE ${TABLE_NAME}
    SET ${fieldTexts.join(', ')}
    WHERE id = $${fieldIndex} 
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(query, [...fieldValues, directoryId]);
    return rows[0];
  } finally {
    pool.end();
  }
};
