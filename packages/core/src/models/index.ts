import { sequelize } from '../db';
import DirectoryConfig from './DirectoryConfig';
import RecordData from './RecordData';
import User from './User';

export const initialize = () => {
  DirectoryConfig.initialize(sequelize);
  RecordData.initialize(sequelize);
  User.initialize(sequelize);
};
