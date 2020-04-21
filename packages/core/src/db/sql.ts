import _ from 'lodash';
import { Field } from '../type';

export const initialize = `
  CREATE TABLE IF NOT EXISTS lh_users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    permissions JSON
  );

  CREATE TABLE IF NOT EXISTS lh_metadata (
    id SERIAL PRIMARY KEY,
    directoryName TEXT UNIQUE NOT NULL,
    displayName TEXT UNIQUE NOT NULL
  );
`;

export const addTestData = `
  INSERT INTO lh_users (
    username, password, permissions
  ) VALUES (
    'admin', '$2b$10$.Wb/OkeXCVImjV0VUh6jdeurxqkIVo5FvfT5B3GR3nl8G.OUBspB2', '["admin"]'
  ) ON CONFLICT DO NOTHING;
`;

export const createTable = (tableName: string, fields: Field[]) => `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id SERIAL PRIMARY KEY,
    ${_.map(fields, ({ name, type }) => `${name} ${type}`).join(', ')}
  )
`;

export const insertMetadata = `
  INSERT INTO lh_metadata (
    directoryName, displayName
  ) VALUES ($1, $2) RETURNING *
`;

export const getAllUsers = `
  SELECT * FROM lh_users
`;

export const addNewUser = `
  INSERT INTO lh_users (
    username, password, permissions
  ) VALUES ($1, $2, $3) RETURNING *
`;
