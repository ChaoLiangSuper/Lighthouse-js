require('dotenv').config();

export const config = {
  port: process.env.CORE_PORT || 5000,
  jwtToken: process.env.JWT_TOKEN || 'secret-token',
  tokenExp: process.env.TOKEN_EXP || '5m',
  db: {
    user: process.env.DB_USER || 'lighthouse',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'lighthouse',
    password: process.env.DB_PASS || 'admin'
  }
};

interface Instance {
  name: string;
  db: string;
}

export const instance: Instance = {
  name: 'Lighthouse-core',
  db: 'Lighthouse.DB'
};
