// Runtime auth configuration for the shared cookie-auth module.
//
// race-ui is built separately from the apps that consume it, so it CANNOT read
// the consumer's Vite build-time env (`import.meta.env.VITE_*`). Instead each app
// calls `configureAuth(...)` once at startup with its own env values, and every
// helper here reads from this runtime singleton. Mirrors the existing
// `configureApiClient` pattern in ../services/apiClient.ts.

export interface AuthRuntimeConfig {
  /** Base URL of the auth authority (assortment_user_bc). Login / refresh /
   *  logout and user-info calls go here. From `VITE_API_USER_URL`. */
  userApiUrl: string;
  /** Base URL of THIS app's own backend. From `VITE_API_URL`. For the landing
   *  app this is the same as `userApiUrl`. */
  appApiUrl: string;
  /** Env-specific cookie name prefix so dev/prod (same host) don't collide.
   *  From `VITE_COOKIE_PREFIX` (`dev_` on dev, empty on prod). */
  cookiePrefix: string;
  /** Base path segment used to build the login redirect URL, e.g. `assortment`
   *  or `dev-assortment`. From `VITE_APP_BASE_URL`. */
  appBaseUrl: string;
  /** App environment string. From `VITE_APP_ENV` (`production` | `development`
   *  | `local`). */
  appEnv: string;
  /** localStorage key for the cached user profile. Shared across the suite. */
  userInfoKey: string;
  /** Per-app sessionStorage key for app-specific session state. */
  sessionKey: string;
}

// Prod-safe defaults so merely importing the module (before configureAuth runs)
// never throws. Real values are supplied by each app's bootstrap.
const config: AuthRuntimeConfig = {
  userApiUrl: '',
  appApiUrl: '',
  cookiePrefix: '',
  appBaseUrl: 'assortment',
  appEnv: 'production',
  userInfoKey: '__user_assortment__',
  sessionKey: '__user_session_assortment__',
};

/** Configure the shared auth module. Call ONCE at app startup, before any API
 *  client is created or used. */
export const configureAuth = (
  partial: Partial<AuthRuntimeConfig>,
): AuthRuntimeConfig => {
  Object.assign(config, partial);
  return config;
};

export const getAuthConfig = (): AuthRuntimeConfig => config;
