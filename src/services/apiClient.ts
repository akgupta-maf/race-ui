import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  authorization?: boolean;
}

export interface ApiClientRuntimeConfig {
  appEnv: string;
  baseURL: string;
  suppressOutsideProduction: boolean;
}

const runtimeConfig: ApiClientRuntimeConfig = {
  appEnv: 'production',
  baseURL: '/assortmentuserbc',
  suppressOutsideProduction: true,
};

const isProductionEnv = () => runtimeConfig.appEnv === 'production';

const apiClient: AxiosInstance = axios.create({
  baseURL: runtimeConfig.baseURL,
  timeout: 60000,
  // Auth now rides in httpOnly cookies; send them with every request.
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const configureApiClient = (
  config: Partial<ApiClientRuntimeConfig>,
): ApiClientRuntimeConfig => {
  Object.assign(runtimeConfig, config);
  apiClient.defaults.baseURL = runtimeConfig.baseURL;
  return runtimeConfig;
};

const getApiClientConfig = (): ApiClientRuntimeConfig => {
  return runtimeConfig;
};

// Suppress all requests outside of production
apiClient.interceptors.request.use((config) => {
  if (!isProductionEnv() && runtimeConfig.suppressOutsideProduction) {
    return Promise.reject(
      new axios.CanceledError(
        'Request suppressed: not a production environment',
      ),
    );
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.resolve(undefined);
    }
    if (error?.response?.status === 401) {
      window.location.href = `/${runtimeConfig.appEnv === 'development' ? 'dev-' : ''}assortment/login`;
    }
    return Promise.reject(error);
  },
);

export { configureApiClient, getApiClientConfig };
export default apiClient;
