import _ from 'lodash';
import React from 'react';
import { StatusType } from '../types/status';
import { DirectoryConfigs, DirectoryConfigAttributes } from '@lighthousejs/types/DirectoryConfig';
import StatusContext from './StatusContext';
import UserContext from './UserContext';
import * as directoryConfigsApi from '../api/directoryConfigs';
import { print } from '../utils/debug';

interface DirectoryConfigContextState {
  directoryConfigs: DirectoryConfigs;
  updateDirectoryConfig: (dictionaryConfig: DirectoryConfigAttributes) => void;
}

const Context = React.createContext<DirectoryConfigContextState>({
  directoryConfigs: {},
  updateDirectoryConfig: _.noop
});

const DirectoryConfigContext: React.FC = ({ children }) => {
  const { addStatus } = React.useContext(StatusContext.Context);
  const { user } = React.useContext(UserContext.Context);
  const [directoryConfigs, setDirectoryConfigs] = React.useState<DirectoryConfigs>(
    JSON.parse(sessionStorage.getItem('directoryConfigs') || '{}')
  );

  React.useEffect(() => {
    sessionStorage.setItem('directoryConfigs', JSON.stringify(directoryConfigs));
  }, [directoryConfigs]);

  print('DirectoryConfigContext', directoryConfigs);

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

DirectoryConfigContext.displayName = 'DirectoryConfigContext';

export default {
  Context,
  State: DirectoryConfigContext
};
