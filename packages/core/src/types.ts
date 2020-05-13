import { Request } from 'express';
import { User } from './models/user';

type ParsedUser = Pick<User, 'username' | 'phone' | 'permissions'>;

export interface RequestWithParsedData extends Request {
  user?: ParsedUser;
}

export type fieldMetadata =
  | {
      defaultValue?: number;
      type: 'number';
    }
  | {
      defaultValue?: string;
      type: 'string';
    }
  | {
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
