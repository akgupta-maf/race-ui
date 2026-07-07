// DEPRECATED shim. The auth code moved to `@maf/race-ui/auth` (cookie-based).
// This module previously held a localStorage/Bearer token model that is no longer
// used. Re-export the cookie helpers so existing `@maf/race-ui/utils` imports keep
// working. Prefer importing from `@maf/race-ui/auth` directly in new code.
export {
  getUserInfo,
  setUserInfo,
  deleteUserInfo,
  getUserSession,
  setUserSession,
  getCsrfToken,
  getRefreshCsrfToken,
  hasSession,
  redirectToLogin,
  refreshAccess,
  logoutServer,
  USER_INFO_CLEARED_EVENT,
} from '../auth/auth-utils';
