import axios from "axios";

const baseService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

baseService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

baseService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔹 401 처리 (바로 로그아웃)
    // if (error.response?.status === 401) {
    //   window.location.href = "/login";
    //   return Promise.reject(error);
    // }

    // 🔹 자동 재시도 (5xx 오류 또는 네트워크 오류)
    const shouldRetry = error.response?.status >= 500 || !error.response;
    originalRequest._retryCount = originalRequest._retryCount || 0;

    if (shouldRetry && originalRequest._retryCount < 3) {
      originalRequest._retryCount += 1;
      return new Promise(
        (resolve) =>
          setTimeout(() => resolve(baseService(originalRequest)), 1000) // 1초 후 재요청
      );
    }

    return Promise.reject(error);
  }
);

export default baseService;
