import { ValueTypes } from './constants';

export type FieldConfig =
  | {
      fieldName: string;
      defaultValue?: number;
      type: ValueTypes.NUMBER;
    }
  | {
      fieldName: string;
      defaultValue?: string;
      type: ValueTypes.STRING;
    }
  | {
      fieldName: string;
      defaultValue?: boolean;
      type: ValueTypes.BOOLEAN;
    };

export interface DirectoryConfigAttributes {
  readonly id: string;
  directoryName: string;
  fields: FieldConfig[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
