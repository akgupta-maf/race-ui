import { getAuthConfig } from './config';
import { createApiClient, RequestOptions } from './auth-client';
import { getRefreshCsrfToken } from './auth-utils';
import type { LoginResponse } from '../services/auth.response';

/**
 * Build the auth-service bound to the authority (assortment_user_bc). Returns the
 * login/refresh/logout/user-info calls; the backend sets httpOnly access/refresh
 * cookies and returns only the user profile.
 *
 * `baseURL` defaults to the configured `userApiUrl`, but callers should pass their
 * build-time `VITE_API_USER_URL` explicitly when this factory runs at module load
 * (before `configureAuth`), to avoid a load-order race.
 */
export const createAuthService = <TLoginResponse = LoginResponse>(
  baseURL?: string,
) => {
  const client = createApiClient({
    baseURL: baseURL ?? getAuthConfig().userApiUrl,
  });

  // Exchange the Microsoft token for our app session. The login response shape
  // is parameterized so each app can supply its own (richer) user/response type.
  const saveSession = async (accessToken: unknown): Promise<TLoginResponse> => {
    const response = await client.post('/api/msal-login', { jwt: accessToken });
    return response.data;
  };

  // Mint a fresh access cookie from the refresh cookie. Uses the refresh CSRF
  // token and skips the 401→refresh interceptor to avoid recursion.
  const refresh = async () => {
    const response = await client.post('/api/auth/refresh', {}, {
      headers: { 'X-CSRF-TOKEN': getRefreshCsrfToken() ?? '' },
      _skipAuthRefresh: true,
    } as RequestOptions);
    return response.data;
  };

  const logout = async () => {
    const response = await client.post('/api/auth/logout', {}, {
      headers: { 'X-CSRF-TOKEN': getRefreshCsrfToken() ?? '' },
      _skipAuthRefresh: true,
    } as RequestOptions);
    return response.data;
  };

  const getUserInfo = async () => {
    const response = await client.get('/api/user-info');
    return response.data;
  };

  return { saveSession, refresh, logout, getUserInfo };
};

export type AuthService = ReturnType<typeof createAuthService>;
