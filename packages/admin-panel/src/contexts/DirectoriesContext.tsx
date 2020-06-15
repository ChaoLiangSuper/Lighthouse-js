import _ from 'lodash';
import React from 'react';
import { StatusType } from '../types/status';
import { DirectoryConfigAttributes } from '../../../types/DirectoryConfig';
import StatusContext from './StatusContext';
import UserContext from './UserContext';
import * as directoryConfigsApi from '../api/directoryConfigs';
import { print } from '../utils/debug';

interface DirectoriesContextState {
  directoryConfigs: Record<string, DirectoryConfigAttributes>;
  updateDirectoryConfig: (dictionaryConfig: DirectoryConfigAttributes) => void;
}

const Context = React.createContext<DirectoriesContextState>({
  directoryConfigs: {},
  updateDirectoryConfig: _.noop
});

const DirectoriesContext: React.FC = ({ children }) => {
  // Global contexts
  const { addStatus } = React.useContext(StatusContext.Context);
  const { user } = React.useContext(UserContext.Context);

  // Local states
  const [directoryConfigs, setDirectoryConfigs] = React.useState<Record<string, DirectoryConfigAttributes>>({});

  // DEBUG
  print('DirectoriesContext', directoryConfigs);

  const initDirectoryConfigs = React.useCallback(async () => {
    try {
      const directoryConfigs = await directoryConfigsApi.getAllDirectoryConfigs();
      setDirectoryConfigs(directoryConfigs);
      addStatus({ message: 'Directories synced!', type: StatusType.info });
    } catch (err) {
      addStatus({ message: 'Syncing directories faild, please try later!', type: StatusType.error });
    }
  }, [addStatus]);

  const clearDirectoryConfigs = () => setDirectoryConfigs({});

  React.useEffect(() => {
    if (user) {
      initDirectoryConfigs();
    }
    return () => clearDirectoryConfigs();
  }, [user, initDirectoryConfigs]);

  const updateDirectoryConfig = React.useCallback((directoryConfig: DirectoryConfigAttributes) => {
    setDirectoryConfigs((prevConfigs) => ({
      ...prevConfigs,
      [directoryConfig.directoryName]: directoryConfig
    }));
  }, []);

  return (
    <Context.Provider
      value={{
        directoryConfigs,
        updateDirectoryConfig
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
