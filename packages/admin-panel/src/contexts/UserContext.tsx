import React from 'react';
import { User } from '../types/user';

interface UserContextState {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
}

const Context = React.createContext<UserContextState>({
  user: null,
  login: () => {
    return;
  },
  logout: () => {
    return;
  }
});

const UserContext: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  const login = (nextUser: User) => setCurrentUser(nextUser);

  const logout = () => setCurrentUser(null);

  return (
    <Context.Provider
      value={{
        user: currentUser,
        login,
        logout
      }}
    >
      {children}
    </Context.Provider>
  );
};

UserContext.displayName = 'UserContext';

export default {
  Provider: UserContext,
  Consumer: Context.Consumer
};
