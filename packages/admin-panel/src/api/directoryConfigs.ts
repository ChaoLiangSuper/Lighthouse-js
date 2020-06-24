import _ from 'lodash';
import { AxiosResponse } from 'axios';
import { instance } from './index';
import { DirectoryConfigs, DirectoryConfigAttributes } from '@lighthousejs/types/DirectoryConfig';

export const getAllDirectoryConfigs = async (): Promise<DirectoryConfigs> => {
  const {
    data: { data }
  } = (await instance.get('/directory/config/all')) as AxiosResponse<{
    data: DirectoryConfigAttributes[];
    rowCount: number;
  }>;
  return _.keyBy(data, 'directoryName');
};

export const addNewDirectoryConfig = async (
  newDirectoryConfig: Pick<DirectoryConfigAttributes, 'directoryName' | 'fields'>
): Promise<DirectoryConfigAttributes> => {
  const { data } = (await instance.post('/directory/config/new', newDirectoryConfig)) as AxiosResponse<
    DirectoryConfigAttributes
  >;
  return data;
};

export const updateDirectoryConfig = async (
  directoryConfig: DirectoryConfigAttributes
): Promise<DirectoryConfigAttributes> => {
  const { data } = (await instance.put(`/directory/config/${directoryConfig.id}`, directoryConfig)) as AxiosResponse<
    DirectoryConfigAttributes
  >;

  return data;
};
