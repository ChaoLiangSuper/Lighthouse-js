import { ValueTypes } from './types';

export type FieldConfig =
  | {
      fieldName: string;
      defaultValue: number;
      type: ValueTypes.NUMBER;
    }
  | {
      fieldName: string;
      defaultValue: string;
      type: ValueTypes.STRING;
    }
  | {
      fieldName: string;
      defaultValue: boolean;
      type: ValueTypes.BOOLEAN;
    };

export type DirectoryConfig = {
  id: number;
  directoryName: string;
  fields: FieldConfig[];
};
