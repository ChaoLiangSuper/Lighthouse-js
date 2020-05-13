import { Pool } from 'pg';
import { config } from '../config';
import { dataType } from '../types';

const TABLE_NAME = 'lh_record_data';

export interface RecordData {
  directoryId: number;
  recordId: number;
  data: {
    [fieldName: string]: dataType;
  };
}

export const createRecordDataTable = `
  CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    directoryId INTEGER NOT NULL,
    recordId INTEGER NOT NULL,
    data JSON
  );
`;

export const getAllRecords = async (directoryId: string) => {
  const pool = new Pool(config.db);
  try {
    const { rows, rowCount } = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE directoryId = $1;`, [directoryId]);
    return {
      data: rows,
      rowCount
    };
  } finally {
    pool.end();
  }
};

export const getOneRecord = async (directoryId: string, recordId: string) => {
  const pool = new Pool(config.db);
  try {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE directoryId = $1 AND recordId = $2;`, [
      directoryId,
      recordId
    ]);
    return rows[0];
  } finally {
    pool.end();
  }
};

export const addRecord = async (directoryId: string, recordId: RecordData['recordId'], data: RecordData['data']) => {
  const pool = new Pool(config.db);
  try {
    const record = await pool.query(
      `
    INSERT INTO ${TABLE_NAME} (
      directoryId, recordId, data
    ) VALUES ($1, $2, $3) RETURNING *
  `,
      [directoryId, recordId, data]
    );
    return record;
  } finally {
    pool.end();
  }
};

export const updateRecord = async (directoryId: string, recordId: string, data?: RecordData['data']) => {
  if (!data) {
    throw 'data is empty';
  }

  const pool = new Pool(config.db);
  const query = `
    UPDATE ${TABLE_NAME}
    SET data = $1
    WHERE directoryId = $2 AND recordId = $3
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(query, [data, directoryId, recordId]);
    return rows[0];
  } finally {
    pool.end();
  }
};
