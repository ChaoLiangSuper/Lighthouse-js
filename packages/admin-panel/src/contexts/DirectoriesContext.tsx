import _ from 'lodash';
import React from 'react';
import { DirectoryCollection, Column } from '../types/types';
import { DirectoryConfig } from '../types/directory';

interface DirectoriesContextState {
  directories: DirectoryCollection;
  appDirectory: (s: string) => void;
  updateDirectories: (s: string) => (columns: Column[]) => void;
  updateNumOfRecord: (s: string, n: number) => void;
  configs: Record<string, DirectoryConfig>;
  initConfigs: (configs: Record<string, DirectoryConfig>) => void;
}

const Context = React.createContext<DirectoriesContextState>({
  directories: {},
  appDirectory: _.noop,
  updateDirectories: () => _.noop,
  updateNumOfRecord: _.noop,
  configs: {},
  initConfigs: _.noop
});

const DirectoriesContext: React.FC = ({ children }) => {
  const [directories, setDirectories] = React.useState<DirectoryCollection>({});
  const [configs, setConfigs] = React.useState<Record<string, DirectoryConfig>>({});

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(directories);
  }

  const appDirectory = (directoryName: string) => {
    setDirectories({
      ...directories,
      [directoryName]: {
        name: directoryName,
        columns: [],
        numOfRecords: 0
      }
    });
  };
  const updateDirectories = (directoryName: string) => (columns: Column[]) => {
    setDirectories({
      ...directories,
      [directoryName]: {
        ...directories[directoryName],
        columns
      }
    });
  };
  const updateNumOfRecord = (directoryName: string, number: number) => {
    setDirectories({
      ...directories,
      [directoryName]: {
        ...directories[directoryName],
        numOfRecords: number
      }
    });
  };

  const initConfigs = (configs: Record<string, DirectoryConfig>) => {
    setConfigs(configs);
  };

  return (
    <Context.Provider
      value={{
        directories,
        appDirectory,
        updateDirectories,
        updateNumOfRecord,
        configs,
        initConfigs
      }}
    >
      {children}
    </Context.Provider>
  );
};

DirectoriesContext.displayName = 'DirectoriesContext';

export default {
  Context,
  State: DirectoriesContext
};
