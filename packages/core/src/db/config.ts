export const config = {
  user: process.env.DB_USER || 'lighthouse',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'lighthouse',
  password: process.env.DB_PASS || 'admin'
};
