export type DirectoryCollection = {
  [s: string]: Directory;
};

export type Directory = {
  name: string;
  keysInTable: string[];
  schema: {
    name: string;
    type: 'string' | 'number' | 'boolean';
    isOptional: boolean;
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
