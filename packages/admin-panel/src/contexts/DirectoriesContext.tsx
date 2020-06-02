import _ from 'lodash';
import React from 'react';
import { DirectoryCollection, Column } from '../types/types';
import { StatusType } from '../types/status';
import { DirectoryConfig } from '../types/directory';
import StatusContext from './StatusContext';
import UserContext from './UserContext';
import * as directoryApi from '../api/directory';
import { print } from '../utils/debug';

interface DirectoriesContextState {
  directories: DirectoryCollection;
  appDirectory: (s: string) => void;
  updateDirectories: (s: string) => (columns: Column[]) => void;
  updateNumOfRecord: (s: string, n: number) => void;
  directoryConfigs: Record<string, DirectoryConfig>;
}

const Context = React.createContext<DirectoriesContextState>({
  directories: {},
  appDirectory: _.noop,
  updateDirectories: () => _.noop,
  updateNumOfRecord: _.noop,
  directoryConfigs: {}
});

const DirectoriesContext: React.FC = ({ children }) => {
  const [directories, setDirectories] = React.useState<DirectoryCollection>({});
  const [directoryConfigs, setConfigs] = React.useState<Record<string, DirectoryConfig>>({});
  const { addStatus } = React.useContext(StatusContext.Context);
  const { user } = React.useContext(UserContext.Context);

  print('DirectoriesContext', directoryConfigs);

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

  const initDirectoryConfigs = async () => {
    try {
      const directoryConfigs = await directoryApi.getAllConfigs();
      setConfigs(directoryConfigs);
      addStatus({ message: 'Directories synced!', type: StatusType.info });
    } catch (err) {
      addStatus({ message: 'Syncing directories faild, please try later!', type: StatusType.error });
    }
  };

  const clearDirectoryConfigs = () => setConfigs({});

  React.useEffect(() => {
    if (user) {
      initDirectoryConfigs();
    }
    return () => clearDirectoryConfigs();
  }, [user]);

  return (
    <Context.Provider
      value={{
        directories,
        appDirectory,
        updateDirectories,
        updateNumOfRecord,
        directoryConfigs
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
