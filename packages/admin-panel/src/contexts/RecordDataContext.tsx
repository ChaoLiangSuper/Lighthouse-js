import _ from 'lodash';
import React from 'react';
import { print } from '../utils/debug';
import { RecordDataset, RecordDataAttributes } from '@lighthousejs/types/RecordData';

interface RecordDataContextState {
  recordDataset: RecordDataset;
  updateRecordDataset: (recordDataset: RecordDataset) => void;
  updateRecordData: (recordData: RecordDataAttributes) => void;
}

const Context = React.createContext<RecordDataContextState>({
  recordDataset: {},
  updateRecordDataset: _.noop,
  updateRecordData: _.noop
});

const RecordsContext: React.FC = ({ children }) => {
  const [recordDataset, setRecordDataset] = React.useState<RecordDataset>(
    JSON.parse(sessionStorage.getItem('recordDataset') || '{}')
  );

  React.useEffect(() => {
    sessionStorage.setItem('recordDataset', JSON.stringify(recordDataset));
  }, [recordDataset]);

  print('RecordDataContext', recordDataset);

  const updateRecordDataset = React.useCallback((newRecordDataset: RecordDataset) => {
    setRecordDataset((prevDataset) => ({
      ...prevDataset,
      ...newRecordDataset
    }));
  }, []);

  const updateRecordData = React.useCallback((recordData: RecordDataAttributes) => {
    setRecordDataset((prevDataset) => ({
      ...prevDataset,
      [recordData.id]: recordData
    }));
  }, []);

  return (
    <Context.Provider
      value={{
        recordDataset,
        updateRecordDataset,
        updateRecordData
      }}
    >
      {children}
    </Context.Provider>
  );
};

RecordsContext.displayName = 'RecordCollectionContext';

export default {
  Context,
  State: RecordsContext
};
