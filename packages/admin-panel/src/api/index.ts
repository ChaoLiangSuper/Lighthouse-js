import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  responseType: 'json'
});

export const setToken = (token: string) => {
  instance.defaults.headers.Authorization = `Bearer ${token}`;
};
