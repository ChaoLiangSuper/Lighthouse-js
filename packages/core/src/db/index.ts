import { Sequelize } from 'sequelize';
import { config, instance } from '../config';
import * as models from '../models';
import * as testData from './testData';

export const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'postgres',
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.warn(`[${instance.db}]: Connected to database.`);
  } catch (err) {
    console.error(`[${instance.db}]: Unable to connect to database, ${err}`);
  }
};

export const initialize = async () => {
  try {
    models.initialize();
    await sequelize.sync();
    console.warn(`[${instance.db}]: Initialized default tables.`);
  } catch (err) {
    console.error(`[${instance.db}]: Initialization error, ${err}`);
  }
};

export const addTestData = async () => {
  try {
    testData.initialize();
    console.warn(`[${instance.db}]: Test data loaded.`);
  } catch (err) {
    console.error(`[${instance.db}]: Test data load failed. ${err}`);
  }
};
