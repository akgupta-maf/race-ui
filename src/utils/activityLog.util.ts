import { getAuthConfig } from '../auth';
import {
  ActivityLogPayload,
  postActivityLog,
} from '../services/user-activity-service';

const MODULE_NAME = 'localization';
const SESSION_ID_KEY = 'user_session_id_localization';

interface LogActivityParams {
  event_type: string;
  event_name: string;
  component: string;
  event_metadata?: Record<string, any>;
  country: string;
}

// Generate session ID if it doesn't exist
const getOrCreateSessionId = (): string => {
  const appEnv = getAuthConfig().appEnv;
  const sessionStorageKey = `${SESSION_ID_KEY}_${appEnv}`;
  let sessionId = sessionStorage.getItem(sessionStorageKey);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(sessionStorageKey, sessionId);
  }

  return sessionId;
};

// Get current page from window location
const getCurrentPage = (): string => {
  return window.location.pathname;
};

// Main utility function to log activity
const logActivity = async (params: LogActivityParams): Promise<void> => {
  try {
    const payload: ActivityLogPayload = {
      module: MODULE_NAME,
      country: params.country,
      session_id: getOrCreateSessionId(),
      event_type: params.event_type,
      event_name: params.event_name,
      page: getCurrentPage(),
      component: params.component,
      event_metadata: params.event_metadata,
    };

    await postActivityLog(payload);
  } catch (error) {
    // Fail silently for activity logging to avoid disrupting user experience
    console.warn('Activity logging failed:', error);
  }
};

// Convenience functions for common events
const logClick = (
  component: string,
  event_name: string,
  country: string,
  metadata?: Record<string, any>,
) => {
  return logActivity({
    event_type: 'click',
    event_name,
    component,
    event_metadata: metadata,
    country,
  });
};

const logDownloadClick = (
  component: string,
  event_name: string,
  country: string,
  metadata?: Record<string, any>,
) => {
  return logActivity({
    event_type: 'download',
    event_name,
    component,
    event_metadata: metadata,
    country,
  });
};

const logView = (
  component: string,
  event_name: string,
  country: string,
  metadata?: Record<string, any>,
) => {
  return logActivity({
    event_type: 'view',
    event_name,
    component,
    event_metadata: metadata,
    country,
  });
};

const logInput = (
  component: string,
  event_name: string,
  country: string,
  metadata?: Record<string, any>,
) => {
  return logActivity({
    event_type: 'input',
    event_name,
    component,
    event_metadata: metadata,
    country,
  });
};

const logSubmit = (
  component: string,
  event_name: string,
  country: string,
  metadata?: Record<string, any>,
) => {
  return logActivity({
    event_type: 'submit',
    event_name,
    component,
    event_metadata: metadata,
    country,
  });
};

// Clear session on logout
const clearSession = (): void => {
  const appEnv = getAuthConfig().appEnv;
  sessionStorage.removeItem(`${SESSION_ID_KEY}_${appEnv}`);
};

export {
  clearSession,
  getOrCreateSessionId,
  logActivity,
  logClick,
  logDownloadClick,
  logInput,
  logSubmit,
  logView,
};

export type { LogActivityParams };
