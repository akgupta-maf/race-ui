import type { AxiosInstance } from 'axios';
import { createApiClient, getAuthConfig } from '../auth';

interface ActivityLogPayload {
  module: string;
  country: string;
  session_id: string;
  event_type: string;
  event_name: string;
  page: string;
  component: string;
  event_metadata?: Record<string, any>;
}

// Activity logs live on the auth authority (assortment_user_bc), so target its
// base URL. Built lazily on first use so `configureAuth(...)` (called at app
// startup) has run before we read `userApiUrl` — race-ui components can be
// imported before that bootstrap. Uses the cookie-auth client, which attaches
// the X-CSRF-TOKEN header on mutating requests and refreshes on 401 — the plain
// legacy client did neither, so every tab-click log 401'd.
let client: AxiosInstance | null = null;
const getClient = (): AxiosInstance => {
  if (!client) {
    client = createApiClient({ baseURL: getAuthConfig().userApiUrl });
  }
  return client;
};

const postActivityLog = async (payload: ActivityLogPayload) => {
  try {
    const response = await getClient().post('/api/activity-logs', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to post activity log:', error);
    throw error;
  }
};

export { postActivityLog };
export type { ActivityLogPayload };
