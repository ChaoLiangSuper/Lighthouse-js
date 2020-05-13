import { instance, config } from './config';
import http from 'http';
import app from './app';
import * as db from './db';

const server = http.createServer(app);

server.listen({ port: config.port }, async () => {
  console.warn(`[${instance.name}]: Listening on port ${config.port}`);
  await db.connect();
  await db.initialize(true);
  await db.addTestData();
});

server.on('error', (err) => {
  console.error(`[${instance.name}]: ${err}`);
});
