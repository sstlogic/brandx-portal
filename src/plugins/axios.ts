import baseAxios from 'axios';
// import { APIRequestConfig } from '@/services/api/api.types';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useStatus } from '@/composables/useStatus';

export interface APIRequestConfig extends AxiosRequestConfig {
  scoped?: boolean;
  name?: string;
}

const config: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
};

const axios: AxiosInstance = baseAxios.create(config);

axios.interceptors.request.use(
  function (config: APIRequestConfig) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { setErrorMessage } = useStatus();
    // if (error.response && error.response.status == 401) {
    //   storeLogout();
    //   window.location.href = '/login';
    // }
    // if (error.response && error.response.status == 403) {
    //   setErrorMessage(error.response.data.message);
    // }
    if (error.response && error.response.status == 500) {
      setErrorMessage('Whoops! Something went wrong. Please try again or contact us.');
    }

    return Promise.reject(error);
  }
);

export { axios };
