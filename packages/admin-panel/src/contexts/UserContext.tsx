import _ from 'lodash';
import React from 'react';
import decoder from 'jwt-decode';
import cookies from '../utils/cookies';
import { setToken } from '../api';
import { print } from '../utils/debug';
import { UserAttributes } from '@lighthousejs/types/User';

interface UserContextState {
  user: UserAttributes | null;
  login: (u: UserAttributes) => void;
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
    const { user } = decoder(token) as { user: UserAttributes };
    setToken(token);
    return user;
  } catch (err) {
    return null;
  }
};

const UserContext: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<UserAttributes | null>(parseToken());

  print('UserContext', user);

  const login = (nextUser: UserAttributes) => setUser(nextUser);

  const logout = () => {
    cookies.remove('lh_token', { path: '/' });
    setUser(null);
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
