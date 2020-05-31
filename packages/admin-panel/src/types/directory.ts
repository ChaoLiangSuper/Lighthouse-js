import { fieldConfig } from './field';

export type DirectoryConfig = {
  directoryName: string;
  fields: Record<string, fieldConfig>;
};
