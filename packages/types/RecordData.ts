import { ValueTypes } from './constants';

export type DataType =
  | {
      fieldName: string;
      value: number;
      type: ValueTypes.NUMBER;
    }
  | {
      fieldName: string;
      value: string;
      type: ValueTypes.STRING;
    }
  | {
      fieldName: string;
      value: boolean;
      type: ValueTypes.BOOLEAN;
    };

export interface RecordDataAttributes {
  readonly id: string;
  readonly directoryConfigId: string;
  data: Record<string, DataType>;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
