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

export enum recordActionType {
  RECORD_ADD = 'RECORD_ADD',
  RECORD_UPDATE = 'RECORD_UPDATE',
  RECORD_DELETE = 'RECORD_DELETE'
}

export type RecordAction = {
  type: recordActionType.RECORD_UPDATE;
  data: {
    directoryName: string;
    updatedField: Record;
  };
};
