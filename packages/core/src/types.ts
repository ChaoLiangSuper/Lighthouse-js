import { Request } from 'express';
import { UserAttributes } from './models/User';

export enum ValueTypes {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN'
}

type ParsedUser = Pick<UserAttributes, 'username' | 'phone' | 'permissions'>;

export interface RequestWithParsedData extends Request {
  user?: ParsedUser;
}

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
