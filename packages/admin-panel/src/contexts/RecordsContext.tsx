import _ from 'lodash';
import React from 'react';
import { RecordCollection, Record } from '../types/types';
import { print } from '../utils/debug';

interface RecordsContextState {
  records: RecordCollection;
  updateRecord: (s: string, r: Record) => void;
}

const Context = React.createContext<RecordsContextState>({
  records: {},
  updateRecord: _.noop
});

const RecordsContext: React.FC = ({ children }) => {
  const [records, setRecords] = React.useState<RecordCollection>({});

  print('RecordsContext', records);

  const updateRecord = (directoryName: string, record: Record) => {
    setRecords({
      ...records,
      [record.key]: {
        ...records[record.key],
        record
      }
    });
  };

  return (
    <Context.Provider
      value={{
        records,
        updateRecord
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
