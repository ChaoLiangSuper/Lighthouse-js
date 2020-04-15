import http from 'http';
import app from './app';
import dotenv from 'dotenv';
import { instance } from './config';
import * as db from './db';

dotenv.config({ path: '../../.env' });

const port = process.env.CORE_PORT || 5000;
const server = http.createServer(app);

server.listen({ port }, () => {
  console.warn(`[${instance.name}]: Listening on port ${port}`);
  db.connect();
});

server.on('error', (err) => {
  console.error(`[${instance.name}]: ${err}`);
});
