export const testData = `
  INSERT INTO lh_users (
    username, password, permissions
  ) VALUES (
    'admin', '$2b$10$.Wb/OkeXCVImjV0VUh6jdeurxqkIVo5FvfT5B3GR3nl8G.OUBspB2', '["admin"]'
  ) ON CONFLICT DO NOTHING;

  INSERT INTO lh_metadata (
    directoryName, fields
  ) VALUES ('directory1', '{
    "number field": {
      "type": "number"
    },
    "string field": {
      "type": "string"
    }
  }');

  INSERT INTO lh_metadata (
    directoryName, fields
  ) VALUES ('directory2', '{
    "number field": {
      "type": "number"
    }
  }');
`;
