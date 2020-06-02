import React from 'react';
import StatusContext from './StatusContext';
import UserContext from './UserContext';
import DirectoriesContext from './DirectoriesContext';
import RecordsContext from './RecordsContext';

const ContextsProvider: React.FC = ({ children }) => (
  <StatusContext.State>
    <UserContext.State>
      <DirectoriesContext.State>
        <RecordsContext.State>{children}</RecordsContext.State>
      </DirectoriesContext.State>
    </UserContext.State>
  </StatusContext.State>
);

export default ContextsProvider;
