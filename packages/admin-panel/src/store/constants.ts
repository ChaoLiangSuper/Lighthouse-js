import { User } from './reducers/user';

export type userActionType = 'LOGIN' | 'LOGOUT';

export interface UserAction {
  type: userActionType;
  data: User;
}
