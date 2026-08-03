import axios, { AxiosError } from "axios";

interface ApiErrorResponse {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
}

const ACCESS_TOKEN_KEY = "accessToken";
const AUTH_USER_KEY = "authUser";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL is not configured");
}

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
 * Add the JWT access token to protected requests.
 */
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/*
 * Handle common API response errors.
 */
axiosClient.interceptors.response.use(
  (response) => response,

  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);

      const isAuthenticationPage =
        window.location.pathname === "/login" ||
        window.location.pathname === "/register";

      if (!isAuthenticationPage) {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;