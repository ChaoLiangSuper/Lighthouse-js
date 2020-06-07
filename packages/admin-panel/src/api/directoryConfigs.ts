import _ from 'lodash';
import { AxiosResponse } from 'axios';
import { instance } from './index';
import { DirectoryConfig } from '../types/directory';

export const getAllDirectoryConfigs = async (): Promise<Record<string, DirectoryConfig>> => {
  const {
    data: { data }
  } = (await instance.get('/directory/config/all')) as AxiosResponse<{
    data: DirectoryConfig[];
    rowCount: number;
  }>;
  return _.keyBy(data, 'directoryName');
};

export const addNewDirectoryConfig = async (directoryConfig: DirectoryConfig): Promise<DirectoryConfig> => {
  const { data } = (await instance.post('/directory/config/new', directoryConfig)) as AxiosResponse<DirectoryConfig>;
  return data;
};

export const updateDirectoryConfig = async (directoryConfig: DirectoryConfig): Promise<DirectoryConfig> => {
  const { data } = (await instance.put(`/directory/config/${directoryConfig.id}`, directoryConfig)) as AxiosResponse<
    DirectoryConfig
  >;

  return data;
};
