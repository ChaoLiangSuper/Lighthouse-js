import { User } from './reducers/user';
import { Directory } from './reducers/directory';
import { Record } from './reducers/record';

export type userActionType = 'LOGIN' | 'LOGOUT';

export interface UserAction {
  type: userActionType;
  data: User;
}

export type directoryActionType = 'DIRECTORY_ADD' | 'DIRECTORY_UPDATE' | 'DIRECTORY_DELETE';

export interface DirectoryAction {
  type: directoryActionType;
  data: Directory;
}

export type recordActionType = 'RECORD_ADD' | 'RECORD_UPDATE' | 'RECORD_DELETE';

export interface RecordAction {
  type: recordActionType;
  data: Record;
}
