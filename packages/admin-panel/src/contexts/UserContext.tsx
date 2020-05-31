import _ from 'lodash';
import React from 'react';
import decoder from 'jwt-decode';
import { User } from '../types/user';
import cookies from '../utils/cookies';
import { setToken } from '../api';

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
  const [currentUser, setCurrentUser] = React.useState<User | null>(parseToken());

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(currentUser);
  }

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
