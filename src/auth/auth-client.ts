import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { getAuthConfig } from './config';
import { getCsrfToken, redirectToLogin, refreshAccess } from './auth-utils';

// Config for OUTGOING requests: allows plain-object headers (unlike the internal
// config type) and carries the refresh-bypass flag used by refresh/logout calls.
export type RequestOptions = AxiosRequestConfig & { _skipAuthRefresh?: boolean };

type RetriableConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  _skipAuthRefresh?: boolean;
};

const MUTATING = ['post', 'put', 'patch', 'delete'];

/**
 * Wire cookie auth into an axios instance:
 *  - send the httpOnly auth cookies with every request (`withCredentials`),
 *  - attach the CSRF token on mutating requests,
 *  - on a 401, transparently refresh the access cookie once (via the authority)
 *    and replay the request; on repeated failure, redirect to login.
 */
export const configureAuthClient = (instance: AxiosInstance): AxiosInstance => {
  instance.defaults.withCredentials = true;

  instance.interceptors.request.use(
    (config: RetriableConfig) => {
      const method = (config.method || 'get').toLowerCase();
      if (MUTATING.includes(method)) {
        config.headers = config.headers || {};
        // Don't clobber an explicit token (refresh/logout set the refresh CSRF).
        if (!config.headers['X-CSRF-TOKEN']) {
          const csrf = getCsrfToken();
          if (csrf) config.headers['X-CSRF-TOKEN'] = csrf;
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error?.config as RetriableConfig | undefined;
      const status = error?.response?.status;

      if (status !== 401 || !original || original._skipAuthRefresh) {
        if (status === 401) redirectToLogin();
        return Promise.reject(error);
      }

      if (original._retry) {
        // Already tried a refresh for this request — give up.
        redirectToLogin();
        return Promise.reject(error);
      }

      original._retry = true;
      try {
        // Mint a new access cookie using the refresh cookie, then replay.
        await refreshAccess();
        return instance(original);
      } catch (refreshError) {
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    },
  );

  return instance;
};

export interface CreateApiClientOptions {
  /** Defaults to the configured app backend (`appApiUrl`). */
  baseURL?: string;
  /** Request timeout in ms. Defaults to 60000. */
  timeout?: number;
  /** Extra default headers merged over `Content-Type: application/json`. */
  headers?: Record<string, string>;
}

/**
 * Create a cookie-auth-wired axios instance. Call AFTER `configureAuth(...)` so
 * the default base URL resolves. Pass `baseURL` explicitly for app backends.
 */
export const createApiClient = (
  options: CreateApiClientOptions = {},
): AxiosInstance => {
  const instance = axios.create({
    baseURL: options.baseURL ?? getAuthConfig().appApiUrl,
    timeout: options.timeout ?? 60000,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });
  return configureAuthClient(instance);
};
