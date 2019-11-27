import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import { instance } from './config';

const port = process.env.PORT || 5000;
const dbHost = process.env.DB_HOST || 'mongodb://localhost:27017/lighthouse';
const server = http.createServer(app);

server.listen(port);
server.on('error', err => {
  console.error(`[${instance.name}]: ${err}`);
});
server.on('listening', () => {
  console.info(`[${instance.name}]: Listening on port ${port}`);
  mongoose.connect(dbHost, { useNewUrlParser: true });
  mongoose.connection.once('open', () => {
    console.info(`[${instance.name}]: Connected to database`);
  });
  mongoose.connection.on('error', err => {
    console.info(`[${instance.name}]: Unable to connect to database, ${err}`);
  });
});
