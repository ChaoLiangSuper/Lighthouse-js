import _ from 'lodash';
import { Field } from '../type';

export const initialize = `
  CREATE TABLE IF NOT EXISTS lh_users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    permissions TEXT []
  );

  CREATE TABLE IF NOT EXISTS lh_metadata (
    id SERIAL PRIMARY KEY,
    collectionName TEXT UNIQUE NOT NULL,
    displayName TEXT UNIQUE NOT NULL
  );
`;

export const addTestData = `
  INSERT INTO lh_users (
    username, password, permissions
  ) VALUES (
    'admin', 'admin', '{"admin"}'
  ) ON CONFLICT DO NOTHING;
`;

export const createTable = (tableName: string, fields: Field[]) => `
  CREATE TABLE ${tableName} (
    id SERIAL PRIMARY KEY,
    ${_.map(fields, ({ name, type }) => `${name} ${type}`).join(', ')}
  )
`;

export const insertMetadata = `
  INSERT INTO lh_metadata (
    collectionName, displayName
  ) VALUES ($1, $2) RETURNING *
`;
