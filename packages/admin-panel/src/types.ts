import { fieldType } from './constant';

export type ValueType = string | number | boolean;

export type Column = {
  name: string;
  type: fieldType;
  isOptional: boolean;
  defaultValue: ValueType;
};

export type DirectoryCollection = {
  [directoryName: string]: Directory;
};

export type Directory = {
  name: string;
  columns: Column[];
  numOfRecords: number;
};

export type RecordCollection = {
  [directoryName: string]: {
    [recordKey: string]: Record;
  };
};

export type Record = {
  key: string;
  [columnName: string]: any;
};

export type User = {
  username: string | null;
  permissions: string[];
};

export type Store = {
  directories: DirectoryCollection;
  recordCollection: RecordCollection;
  user: User;
};
