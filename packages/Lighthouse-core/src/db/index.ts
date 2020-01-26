import mongoose from 'mongoose';
import { instance } from '../config';

export const connect = async (): Promise<void> => {
  const dbHost = process.env.DB_HOST || 'mongodb://localhost:27017/';
  const dbUser = process.env.DB_USER || '';
  const dbPass = process.env.DB_PASS || '';
  const dbName = process.env.DB_NAME || 'lighthouse';

  try {
    await mongoose.connect(dbHost, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      user: dbUser,
      pass: dbPass,
      dbName: dbName
    });
    console.info(`[DB]: Connected to database`);
  } catch (err) {
    console.info(`[DB]: Unable to connect to database, ${err}`);
  }

  mongoose.connection.on('error', (err) => {
    console.info(`[${instance.name}]: ${err}`);
  });
};
