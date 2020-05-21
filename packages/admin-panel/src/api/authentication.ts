import { AxiosResponse } from 'axios';
import decoder from 'jwt-decode';
import { instance } from './index';
import { User } from '../types/user';
import cookies from '../utils/cookies';

export const login = async (username: string, password: string): Promise<User> => {
  const {
    data: { token }
  } = (await instance.post('/login', {
    username,
    password
  })) as AxiosResponse<{ token: string }>;
  const { user } = decoder(token) as { user: User };
  cookies.set('lh_token', token, { expires: new Date(Date.now() + 24 * 3600 * 1000) });
  return user;
};

export const logout = (): Promise<AxiosResponse<{}>> => instance.get('/logout');
