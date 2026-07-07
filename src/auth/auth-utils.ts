import axios from 'axios';
import { getAuthConfig } from './config';
import type { UserDetails } from '../services/auth.response';

// Dispatched whenever the cached user profile is cleared, so app-level context
// providers can react (e.g. drop in-memory user state).
export const USER_INFO_CLEARED_EVENT = 'assortment:user-info-cleared';

// --- Cached user profile (localStorage) ----------------------------------
export const getUserInfo = () => {
  const key = getAuthConfig().userInfoKey;
  const raw = localStorage.getItem(key);
  if (raw && raw !== 'undefined') {
    return JSON.parse(raw);
  }
  return null;
};

export const setUserInfo = (userInfo: UserDetails) => {
  localStorage.setItem(getAuthConfig().userInfoKey, JSON.stringify(userInfo));
};

export const deleteUserInfo = () => {
  localStorage.removeItem(getAuthConfig().userInfoKey);
  sessionStorage.clear();
  window.dispatchEvent(new Event(USER_INFO_CLEARED_EVENT));
};

// --- Per-app session (sessionStorage) ------------------------------------
export const getUserSession = () => {
  const raw = sessionStorage.getItem(getAuthConfig().sessionKey);
  return raw ? JSON.parse(raw) : null;
};

export const setUserSession = (userSession: unknown) => {
  sessionStorage.setItem(
    getAuthConfig().sessionKey,
    JSON.stringify(userSession),
  );
};

// --- Cookie-based auth helpers -------------------------------------------
// The JWT now lives in httpOnly cookies and is NOT readable here (that is the
// point — XSS can't steal it). The only readable auth artifacts are the CSRF
// tokens Flask-JWT-Extended sets alongside the access/refresh cookies.
const readCookie = (name: string): string | null => {
  const match = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)',
    ),
  );
  return match ? decodeURIComponent(match[1]) : null;
};

// Sent as X-CSRF-TOKEN on mutating requests authenticated by the access cookie.
// The prefix must match the backend COOKIE_PREFIX for this environment, so dev
// and prod cookies (same host, port-agnostic) don't collide.
export const getCsrfToken = () =>
  readCookie(getAuthConfig().cookiePrefix + 'csrf_access_token');

// Sent as X-CSRF-TOKEN on the refresh/logout calls (refresh cookie).
export const getRefreshCsrfToken = () =>
  readCookie(getAuthConfig().cookiePrefix + 'csrf_refresh_token');

export const hasSession = () => Boolean(getCsrfToken());

const loginUrl = () => {
  // Login always lives in the landing app, whose base path is `assortment` in
  // prod and `dev-assortment` elsewhere — regardless of which app we're in.
  const base =
    getAuthConfig().appEnv === 'production' ? 'assortment' : 'dev-assortment';
  return `/${base}/login`;
};

export const redirectToLogin = () => {
  deleteUserInfo();
  // Avoid a reload loop when we're already on the login page.
  if (!window.location.pathname.endsWith('/login')) {
    window.location.href = loginUrl();
  }
};

// --- Refresh / logout at the authority -----------------------------------
// Single-flight refresh: concurrent 401s share one refresh round-trip.
let refreshPromise: Promise<unknown> | null = null;

export const refreshAccess = () => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${getAuthConfig().userApiUrl}/api/auth/refresh`,
        {},
        {
          withCredentials: true,
          headers: { 'X-CSRF-TOKEN': getRefreshCsrfToken() ?? '' },
        },
      )
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

// Explicit sign-out: revoke the refresh token + clear cookies at the authority.
export const logoutServer = () =>
  axios
    .post(
      `${getAuthConfig().userApiUrl}/api/auth/logout`,
      {},
      {
        withCredentials: true,
        headers: { 'X-CSRF-TOKEN': getRefreshCsrfToken() ?? '' },
      },
    )
    .catch(() => {});
