import { fieldType } from './constant';

export type Column = {
  name: string;
  type: fieldType;
  isOptional: boolean;
  defaultValue: string | number | boolean;
};

export type DirectoryCollection = {
  [directoryName: string]: Directory;
};

export type Directory = {
  name: string;
  columnKeyInMainTable: string[];
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
  [s: string]: any;
};

export type User = {
  username: string | null;
  permissions: string[];
};

export type Store = {
  directories: DirectoryCollection;
  records: RecordCollection;
  user: User;
};
