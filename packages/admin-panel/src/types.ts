export type availableFieldType = 'string' | 'number' | 'boolean';

export type DirectoryCollection = {
  [s: string]: Directory;
};

export type Directory = {
  name: string;
  keysInTable: string[];
  schema: {
    name: string;
    type: availableFieldType;
    isOptional: boolean;
    defaultValue: string;
  }[];
  numOfRecords: number;
};

export type RecordCollection = {
  [s: string]: {
    [s: string]: Record;
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
