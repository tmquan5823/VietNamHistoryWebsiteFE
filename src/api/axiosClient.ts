import { getAccessToken, setAccessToken } from "../utils/storage";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "sonner";
import { useUserStore } from "@/store/useUserStore";
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.data?.code === 401) {
      const accessToken = getAccessToken();
      if (accessToken) {
        try {
          const refreshResponse = await axios.post(
            `${import.meta.env.VITE_URL}/auth/refresh`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              body: {
                refreshToken: useUserStore.getState().refreshToken,
              },
            }
          );
          const newAccessToken = refreshResponse.data.data.access_token;
          if (newAccessToken) {
            setAccessToken(newAccessToken);

            response.config.headers.Authorization = `Bearer ${newAccessToken}`;
            try {
              const newResponse = await axios(response.config);
              return newResponse.data ?? newResponse;
            } catch (error) {
              return Promise.reject(error);
            }
          }
        } catch (refreshError) {
          toast.error("Failed to refresh token: " + refreshError, {
            duration: 4000,
          });
          return Promise.reject(refreshError);
        }
      }
    }

    return response.data ?? response;
  },
  async (error: AxiosError) => {
    const data = error.response?.data as { statusCode?: number } | undefined;
    if (data?.statusCode === 401) {
      const accessToken = getAccessToken();
      if (accessToken) {
        try {
          const refreshResponse = await axios.post(
            `${import.meta.env.VITE_URL}/auth/refresh`,
            {
              refreshToken: useUserStore.getState().refreshToken,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const newAccessToken = refreshResponse.data.data.access_token;
          if (newAccessToken) {
            setAccessToken(newAccessToken);
            return axios(error.config as AxiosRequestConfig);
          }
        } catch (refreshError) {
          toast.error("Failed to refresh token: " + refreshError, {
            duration: 4000,
          });
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
