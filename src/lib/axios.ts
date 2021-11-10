import Axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "@/config";
import captureError from "@/utils/captureError";
import { authClient } from "@/providers/AuthProvider/Auth0Provider";

// TODO: This is in need of a desperate rewrite.
async function authRequestInterceptor(config: AxiosRequestConfig) {
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
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use((response) => {
  return response.data;
});
