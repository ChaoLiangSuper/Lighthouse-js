import React from 'react';
import docoder from 'jwt-decode';
import { User } from '../types/user';
import cookies from '../utils/cookies';

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

const parseToken = () => {
  try {
    const token = cookies.get('lh_token') as string;
    const { user } = docoder(token) as { user: User };
    return user;
  } catch (err) {
    return null;
  }
};

const UserContext: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(parseToken());

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
  Context,
  State: UserContext
};
