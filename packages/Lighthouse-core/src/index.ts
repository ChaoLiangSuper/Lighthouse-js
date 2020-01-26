import http from 'http';
import app from './app';
import { instance } from './config';
import dotenv from 'dotenv';
import * as db from './db';

dotenv.config({ path: '../../.env' });

const port = process.env.CORE_PORT || 5000;
const server = http.createServer(app);

server.listen(port);
server.on('error', (err) => {
  console.error(`[${instance.name}]: ${err}`);
});
server.on('listening', () => {
  console.info(`[${instance.name}]: Listening on port ${port}`);
  db.connect();
});
