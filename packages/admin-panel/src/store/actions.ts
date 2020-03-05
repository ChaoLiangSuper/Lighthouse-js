import { User, Record, Column } from '../types';

export type userActionType = 'LOGIN' | 'LOGOUT';

export interface UserAction {
  type: userActionType;
  data: User;
}

export enum directoryActionType {
  DIRECTORY_COLUMNS_UPDATE = 'DIRECTORY_COLUMNS_UPDATE',
  DIRECTORY_ADD = 'DIRECTORY_ADD',
  DIRECTORY_RECORD_NUMBER_UPDATE = 'DIRECTORY_RECORD_NUMBER_UPDATE'
}

export type DirectoryAction =
  | {
      type: directoryActionType.DIRECTORY_COLUMNS_UPDATE;
      data: {
        name: string;
        columns: Column[];
      };
    }
  | {
      type: directoryActionType.DIRECTORY_ADD;
      data: {
        name: string;
      };
    }
  | {
      type: directoryActionType.DIRECTORY_RECORD_NUMBER_UPDATE;
      data: {
        name: string;
        numOfRecords: number;
      };
    };

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
