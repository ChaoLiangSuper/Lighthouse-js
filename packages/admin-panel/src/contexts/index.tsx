import React from 'react';
import StatusContext from './StatusContext';
import UserContext from './UserContext';
import DirectoryConfigContext from './DirectoryConfigContext';
import RecordsContext from './RecordDataContext';

const ContextsProvider: React.FC = ({ children }) => (
  <StatusContext.State>
    <UserContext.State>
      <DirectoryConfigContext.State>
        <RecordsContext.State>{children}</RecordsContext.State>
      </DirectoryConfigContext.State>
    </UserContext.State>
  </StatusContext.State>
);

export default ContextsProvider;
