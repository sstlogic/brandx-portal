import { UserData } from '@/models';
import { AxiosRequestConfig } from 'axios';

export type APIResponse<T = any> = Promise<T>;

export type ResourceResponse<T> = Promise<{ data: T }>;

export interface APIRequestConfig extends AxiosRequestConfig {
  scoped?: boolean;
  name?: string;
}

export type LoginCredentials = {
  email: string;
  password: string;
};

export type ResetPasswordData = LoginCredentials & { token: string };

export interface IAPI {
  get: <T = any>(url: string, options?: APIRequestConfig) => APIResponse<T>;
  $delete: <T = any>(url: string, options?: APIRequestConfig) => APIResponse<T>;
  post: <T = any>(url: string, data: any, options?: APIRequestConfig) => APIResponse<T>;
  put: <T = any>(url: string, data: any, options?: APIRequestConfig) => APIResponse<T>;
  login: (credentials: LoginCredentials) => ResourceResponse<UserData>;
  logout: () => Promise<void>;
  getCsrfCookie: () => Promise<void>;
}
