import { ValueTypes } from './constants';

export type DataType = {
  fieldName: string;
  value: string;
  type: ValueTypes;
};

export interface RecordDataAttributes {
  readonly id: string;
  readonly directoryConfigId: string;
  data: {
    [filedName: string]: DataType;
  };
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface RecordDataset {
  [recordDataId: string]: RecordDataAttributes;
}
