import React from 'react';
import UserContext from './UserContext';
import DirectoriesContext from './DirectoriesContext';
import RecordsContext from './RecordsContext';

const ContextsProvider: React.FC = ({ children }) => (
  <UserContext.State>
    <DirectoriesContext.State>
      <RecordsContext.State>{children}</RecordsContext.State>
    </DirectoriesContext.State>
  </UserContext.State>
);

export default ContextsProvider;
