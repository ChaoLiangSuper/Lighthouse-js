import _ from 'lodash';
import React from 'react';
import { Status } from '../types/status';
import { print } from '../utils/debug';

interface StatusContextState {
  statusList: Status[];
  addStatus: (newStatus: Pick<Status, 'message' | 'type'>) => void;
  removeStatus: (id: string) => void;
}

const Context = React.createContext<StatusContextState>({
  statusList: [],
  addStatus: _.noop,
  removeStatus: _.noop
});

const StatusContext: React.FC = ({ children }) => {
  const [statusList, setStatusList] = React.useState<Status[]>([]);

  print('StatusContext', statusList);

  const addStatus = (newStatus: Pick<Status, 'message' | 'type'>) => {
    setStatusList((prevStatusList) => [
      ...prevStatusList,
      {
        ...newStatus,
        id: _.uniqueId('status-')
      }
    ]);
  };

  const removeStatus = (id: string) => {
    setStatusList((prevStatusList) => {
      const newStatusList = [...prevStatusList];
      _.remove(newStatusList, (feedback) => feedback.id === id);
      return newStatusList;
    });
  };

  return (
    <Context.Provider
      value={{
        statusList,
        addStatus,
        removeStatus
      }}
    >
      {children}
    </Context.Provider>
  );
};

StatusContext.displayName = 'StatusContext';

export default {
  Context,
  State: StatusContext
};
