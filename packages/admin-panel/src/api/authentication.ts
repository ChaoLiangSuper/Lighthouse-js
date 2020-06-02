import { AxiosResponse } from 'axios';
import decoder from 'jwt-decode';
import { instance, setToken } from './index';
import { User } from '../types/user';
import cookies from '../utils/cookies';

export const login = async (username: string, password: string): Promise<User> => {
  const {
    data: { token }
  } = (await instance.post('/login', {
    username,
    password
  })) as AxiosResponse<{ token: string }>;
  const { user, exp } = decoder(token) as { user: User; exp: number };
  cookies.set('lh_token', token, { path: '/', expires: new Date(exp * 1000) });
  setToken(token);
  return user;
};

export const logout = (): Promise<AxiosResponse<{}>> => instance.get('/logout');
