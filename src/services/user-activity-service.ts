import apiClient, { CustomAxiosRequestConfig } from './apiClient';

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

const postActivityLog = async (payload: ActivityLogPayload) => {
  try {
    const config: CustomAxiosRequestConfig = {
      authorization: true, // Enable authorization if needed
    };

    const response = await apiClient.post(
      '/api/activity-logs',
      payload,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Failed to post activity log:', error);
    throw error;
  }
};

export { postActivityLog };
export type { ActivityLogPayload };
