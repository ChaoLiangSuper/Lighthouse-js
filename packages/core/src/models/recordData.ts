import { Pool } from 'pg';
import { config } from '../config';

const TABLE_NAME = 'lh_record_data';

export interface RecordData {
  collectionId: number;
  recordId: number;
  data: {
    [fieldName: string]: {
      value: any;
      type: string;
    };
  };
}

export const createRecordDataTable = `
  CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    collectionId INTEGER NOT NULL,
    recordId INTEGER NOT NULL,
    data JSON
  );
`;

export const addRecord = async (
  collectionId: RecordData['collectionId'],
  recordId: RecordData['recordId'],
  data: RecordData['data']
) => {
  const pool = new Pool(config.db);
  try {
    const record = await pool.query(
      `
    INSERT INTO ${TABLE_NAME} (
      collectionId, recordId, data
    ) VALUES ($1, $2, $3) RETURNING *
  `,
      [collectionId, recordId, data]
    );
    return record;
  } catch (err) {
    throw Error(err);
  } finally {
    pool.end();
  }
};
