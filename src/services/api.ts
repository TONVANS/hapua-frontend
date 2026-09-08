import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Request interceptor for attaching auth token and configuring Content-Type
apiClient.interceptors.request.use(
  (config) => {
    // If payload is FormData, remove Content-Type so browser/Axios automatically sets multipart/form-data with boundary
    if (config.data instanceof FormData) {
      if (config.headers) {
        delete config.headers['Content-Type'];
        delete config.headers['content-type'];
        if (typeof (config.headers as any).delete === 'function') {
          (config.headers as any).delete('Content-Type');
          (config.headers as any).delete('content-type');
        }
      }
    } else {
      // Default to application/json for non-FormData requests
      if (config.headers && !config.headers['Content-Type'] && !config.headers['content-type']) {
        config.headers['Content-Type'] = 'application/json';
      }
    }

    // Only in browser environment
    if (typeof window !== "undefined") {
      const token = Cookies.get("hapua_token");
      if (token && token !== "undefined" && token !== "null") {
        if (typeof config.headers?.set === "function") {
          config.headers.set("Authorization", `Bearer ${token}`);
        } else if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling unwrap and 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => {
    // If backend wrapped payload in NestJS TransformInterceptor { statusCode, message, data }
    if (
      response.data &&
      typeof response.data === "object" &&
      "data" in response.data &&
      "statusCode" in response.data
    ) {
      response.data = response.data.data;
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/admin/login")
      ) {
        Cookies.remove("hapua_token");
        Cookies.remove("hapua_user");
        window.location.href = "/admin/login?error=session_expired";
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
