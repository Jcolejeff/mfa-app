'use client';

import axios from 'axios';
import { getCookie } from 'cookies-next';

import { API_URL, APP_URL } from './constants';

export const $http = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': APP_URL,
  },
  withCredentials: true,
});

export const addAccessTokenToHttpInstance = (token: string) => {
  $http.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${token ?? getCookie('access_token')}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
};
