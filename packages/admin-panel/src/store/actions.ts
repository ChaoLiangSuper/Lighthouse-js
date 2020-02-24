import { User, Record, Column } from '../types';

export type userActionType = 'LOGIN' | 'LOGOUT';

export interface UserAction {
  type: userActionType;
  data: User;
}

export interface DirectoryAction {
  type: 'DIRECTORY_COLUMNS_UPDATE';
  data: {
    name: string;
    columns: Column[];
  };
}

export type recordActionType = 'RECORD_ADD' | 'RECORD_UPDATE' | 'RECORD_DELETE';

export interface RecordAction {
  type: recordActionType;
  data: Record;
}
