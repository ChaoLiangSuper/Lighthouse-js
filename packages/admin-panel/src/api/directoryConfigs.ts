import _ from 'lodash';
import { AxiosResponse } from 'axios';
import { instance } from './index';
import { DirectoryConfig } from '../types/directory';

export const getAllConfigs = async (): Promise<Record<string, DirectoryConfig>> => {
  const {
    data: { data }
  } = (await instance.get('/directory/config/all')) as AxiosResponse<{
    data: DirectoryConfig[];
    rowCount: number;
  }>;
  return _.keyBy(data, 'directoryName');
};
