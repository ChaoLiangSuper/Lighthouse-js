import mongoose from 'mongoose';
import { instance } from '../config';

const dbHost = process.env.DB_HOST || 'mongodb://localhost:27017/lighthouse';

export const connect = (): void => {
  mongoose.connect(dbHost, { useNewUrlParser: true });
  mongoose.connection.once('open', () => {
    console.info(`[${instance.name}]: Connected to database`);
  });
  mongoose.connection.on('error', err => {
    console.info(`[${instance.name}]: Unable to connect to database, ${err}`);
  });
};
