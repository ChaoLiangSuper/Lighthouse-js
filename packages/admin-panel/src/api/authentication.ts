import { AxiosResponse } from 'axios';
import { instance } from './index';
import { User } from '../types/user';

export const login = (username: string, password: string): Promise<AxiosResponse<User>> =>
  instance.post('/login', {
    username,
    password
  });

export const logout = (): Promise<AxiosResponse<{}>> => instance.get('/logout');
