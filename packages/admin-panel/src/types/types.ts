export type UrlParams = {
  directoryName: string;
};

export enum ValueTypes {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN'
}

export type ValidValues = string | number | boolean;

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
