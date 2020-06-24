import { ValueTypes } from './constants';

export type FieldConfig = {
  fieldName: string;
  defaultValue?: string;
  type: ValueTypes;
};

export interface DirectoryConfigAttributes {
  readonly id: string;
  directoryName: string;
  fields: FieldConfig[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface DirectoryConfigs {
  [directoryConfigId: string]: DirectoryConfigAttributes;
}
