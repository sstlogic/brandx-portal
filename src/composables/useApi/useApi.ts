/* eslint-disable @typescript-eslint/no-explicit-any */

import { APIRequestConfig, APIResponse, IAPI, LoginCredentials, ResourceResponse } from './types';
import { axios } from '@/plugins/axios';
import { UserData } from '@/models';
import { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../useAuthStore';

export const useApi = (): IAPI => {
  function baseUrl(options: APIRequestConfig = { scoped: true }): string {
    if (options.scoped) {
      //
    }
    const url = axios.defaults.baseURL;

    return url ?? '';
  }

  function config(options?: APIRequestConfig): APIRequestConfig {
    return {
      baseURL: baseUrl(options),
      ...options,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function get<T = any>(url: string, options?: APIRequestConfig): APIResponse<T> {
    const { token, getLocalToken } = useAuthStore();

    const headers: AxiosRequestConfig['headers'] = {
      'Content-Type': 'application/json', // Adjust the content type as needed
    };
    // console.log(token, 'tokenuseruseruser');
    if (token.value == null) {
      getLocalToken();
    }
    // console.log(token.value, 'tokenuseruseruser');
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`;
      options = { ...options, headers };
    }
    const response = await axios.get(url, config(options));
    if (options?.responseType === 'blob') {
      return response as any;
    }

    return response.data;
  }

  async function $delete<T = any>(url: string, options?: APIRequestConfig): APIResponse<T> {
    const { token, getLocalToken } = useAuthStore();

    const headers: AxiosRequestConfig['headers'] = {
      'Content-Type': 'application/json', // Adjust the content type as needed
    };
    // console.log(token, 'tokenuseruseruser');
    if (token.value == null) {
      getLocalToken();
    }
    // console.log(token.value, 'tokenuseruseruser');
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`;
      options = { ...options, headers };
    }
    const response = await axios.delete(url, config(options));
    return response.data;
  }

  async function post<T = any>(url: string, data: any = null, options?: APIRequestConfig): APIResponse<T> {
    const { token, getLocalToken } = useAuthStore();

    const headers: AxiosRequestConfig['headers'] = {
      'Content-Type': 'application/json', // Adjust the content type as needed
    };
    // console.log(token, 'tokenuseruseruser');
    if (token.value == null) {
      getLocalToken();
    }
    // console.log(token.value, 'tokenuseruseruser');
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`;
      options = { ...options, headers };
    }
    const response = await axios.post(url, data, config(options));
    return response.data;
  }

  async function put(url: string, data: any = null, options?: APIRequestConfig): APIResponse {
    const { token, getLocalToken } = useAuthStore();

    const headers: AxiosRequestConfig['headers'] = {
      'Content-Type': 'application/json', // Adjust the content type as needed
    };
    // console.log(token, 'tokenuseruseruser');
    if (token.value == null) {
      getLocalToken();
    }
    // console.log(token.value, 'tokenuseruseruser');
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`;
      options = { ...options, headers };
    }

    const response = await axios.put(url, data, config(options));
    return response.data;
  }

  async function getCsrfCookie(): Promise<void> {
    await get('/sanctum/csrf-cookie', {
      name: 'CSRF Token',
    });
  }

  async function login(credentials: LoginCredentials): ResourceResponse<UserData> {
    await getCsrfCookie();
    return await post('/login', credentials, {
      name: 'User Login',
    });
  }

  async function logout(): Promise<void> {
    try {
      const response = await post('/logout', null, { scoped: false });
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  return { get, $delete, post, put, login, logout, getCsrfCookie };
};
