import _ from 'lodash';
import React from 'react';
import { DirectoryCollection, Column } from '../types/types';

interface DirectoriesContextState {
  directories: DirectoryCollection;
  appDirectory: (s: string) => void;
  updateDirectories: (s: string) => (columns: Column[]) => void;
  updateNumOfRecord: (s: string, n: number) => void;
}

const Context = React.createContext<DirectoriesContextState>({
  directories: {},
  appDirectory: _.noop,
  updateDirectories: () => _.noop,
  updateNumOfRecord: _.noop
});

const DirectoriesContext: React.FC = ({ children }) => {
  const [directories, setDirectories] = React.useState<DirectoryCollection>({
    123: {
      name: '123',
      columns: [],
      numOfRecords: 0
    }
  });

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

  return (
    <Context.Provider
      value={{
        directories,
        appDirectory,
        updateDirectories,
        updateNumOfRecord
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
