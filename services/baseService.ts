import axios from "axios";

export const createBaseService = (baseURL?: string) => {
  const instance = axios.create({
    baseURL: baseURL ?? process.env.NEXT_PUBLIC_BACKEND_SERVER,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const shouldRetry = error.response?.status >= 500 || !error.response;
      originalRequest._retryCount = originalRequest._retryCount || 0;

      if (shouldRetry && originalRequest._retryCount < 3) {
        originalRequest._retryCount += 1;
        return new Promise((resolve) =>
          setTimeout(() => resolve(instance(originalRequest)), 1000)
        );
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const baseService = createBaseService();
