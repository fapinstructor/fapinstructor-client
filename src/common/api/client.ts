import axios, { AxiosError } from "axios";

import captureError from "@/utils/captureError";
import { API_URL } from "@/config";
import { authClient } from "@/providers/AuthProvider/Auth0Provider";

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(async (config) => {
  /**
   * Wait until the auth has finished loading before making any requests
   */
  if (authClient.current?.isLoading) {
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (!authClient.current?.isLoading) {
          resolve();
          clearInterval(interval);
        }
      }, 1);
    });
  }

  if (authClient.current?.isAuthenticated) {
    try {
      const token = await authClient.current.getAccessTokenSilently();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        throw new Error(
          `User exists ${JSON.stringify(
            authClient.current.user
          )}, but no token was present`
        );
      }
    } catch (error) {
      captureError(error);
    }
  }

  return config;
});

// Sentry has a quota, so we want to try and limit the number of events tracked
const ignoreStatusCodes = [400, 404];

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (!status || !ignoreStatusCodes.includes(status)) {
      captureError(error);
    }

    return Promise.reject(error);
  }
);

export default instance;
