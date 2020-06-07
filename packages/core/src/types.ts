import { Request } from 'express';
import { User } from './models/user';

type ParsedUser = Pick<User, 'username' | 'phone' | 'permissions'>;

export interface RequestWithParsedData extends Request {
  user?: ParsedUser;
}

export type FieldConfig =
  | {
      fieldName: string;
      defaultValue?: number;
      type: 'number';
    }
  | {
      fieldName: string;
      defaultValue?: string;
      type: 'string';
    }
  | {
      fieldName: string;
      defaultValue?: boolean;
      type: 'boolean';
    };

export type dataType =
  | {
      value: number;
      type: 'number';
    }
  | {
      value: string;
      type: 'string';
    }
  | {
      value: boolean;
      type: 'boolean';
    };
