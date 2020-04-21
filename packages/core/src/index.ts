require('dotenv').config({ path: '../../.env' });

import http from 'http';
import app from './app';
import { instance } from './config';
import * as db from './db';

const port = process.env.CORE_PORT || 5000;
const server = http.createServer(app);

server.listen({ port }, async () => {
  console.warn(`[${instance.name}]: Listening on port ${port}`);
  await db.connect();
  await db.initialize();
  await db.addTestData();
});

server.on('error', (err) => {
  console.error(`[${instance.name}]: ${err}`);
});
