import { Request } from 'express';
import { User } from './models/user';

type ParsedUser = Pick<User, 'username' | 'phone' | 'permissions'>;

export interface RequestWithParsedData extends Request {
  user?: ParsedUser;
}
