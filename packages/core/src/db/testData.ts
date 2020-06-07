export const testData = `
  INSERT INTO lh_users (
    username, password, permissions
  ) VALUES (
    'admin', '$2b$10$.Wb/OkeXCVImjV0VUh6jdeurxqkIVo5FvfT5B3GR3nl8G.OUBspB2', '["admin"]'
  ) ON CONFLICT DO NOTHING;

  INSERT INTO lh_metadata (
    "directoryName", fields
  ) VALUES ('directory1', '[
    {
      "fieldName": "number field",
      "type": "NUMBER"
    },
    {
      "fieldName": "string field",
      "type": "STRING"
    }
  ]');

  INSERT INTO lh_metadata (
    "directoryName", fields
  ) VALUES ('directory2', '[
    {
      "fieldName": "number field",
      "type": "NUMBER"
    }
  ]');
`;
