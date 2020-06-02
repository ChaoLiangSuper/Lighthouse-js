import _ from 'lodash';
import React from 'react';
import decoder from 'jwt-decode';
import { User } from '../types/user';
import cookies from '../utils/cookies';
import { setToken } from '../api';
import { print } from '../utils/debug';

interface UserContextState {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
}

const Context = React.createContext<UserContextState>({
  user: null,
  login: _.noop,
  logout: _.noop
});

const parseToken = () => {
  try {
    const token = cookies.get('lh_token') as string;
    const { user } = decoder(token) as { user: User };
    setToken(token);
    return user;
  } catch (err) {
    return null;
  }
};

const UserContext: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(parseToken());

  print('UserContext', user);

  const login = (nextUser: User) => setUser(nextUser);

  const logout = () => {
    setUser(null);
    cookies.remove('lh_token');
  };

  return (
    <Context.Provider
      value={{
        user,
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
