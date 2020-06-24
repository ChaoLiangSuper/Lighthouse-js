import _ from 'lodash';
import { AxiosResponse } from 'axios';
import { instance } from './index';
import { RecordDataset, RecordDataAttributes } from '@lighthousejs/types/RecordData';

export const getAllRecordData = async (directoryConfigId: string): Promise<RecordDataset> => {
  const {
    data: { data }
  } = (await instance.get(`/directory/${directoryConfigId}/record/all`)) as AxiosResponse<{
    data: RecordDataAttributes[];
    rowCount: number;
  }>;
  return _.keyBy(data, 'id');
};

export const addNewRecordData = async (
  directoryConfigId: string,
  newRecordData: Pick<RecordDataAttributes, 'data'>
): Promise<RecordDataAttributes> => {
  const { data } = (await instance.post(`/directory/${directoryConfigId}/record/new`, newRecordData)) as AxiosResponse<
    RecordDataAttributes
  >;
  return data;
};

export const updateRecordData = async (
  directoryConfigId: string,
  recordData: RecordDataAttributes
): Promise<RecordDataAttributes> => {
  const { data } = (await instance.put(
    `/directory/${directoryConfigId}/record/${recordData.id}`,
    recordData
  )) as AxiosResponse<RecordDataAttributes>;

  return data;
};
