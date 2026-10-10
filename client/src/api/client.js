import axios from 'axios';

export const TOKEN_KEY = 'token';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 20000,
});

// Attach the JWT (stored in localStorage) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If the token is rejected anywhere (expired / invalid), log the user out globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const url = error.config?.url || '';
    const isAuthForm = url.includes('/auth/login') || url.includes('/auth/register');
    if (error.response?.status === 401 && !isAuthForm) {
      localStorage.removeItem(TOKEN_KEY);
      window.dispatchEvent(new Event('auth:expired'));
    }
    return Promise.reject(error);
  }
);

export const getErrorMessage = (err) => {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.code === 'ERR_NETWORK') return 'Cannot reach the server. Check that the API is running.';
  if (err?.code === 'ECONNABORTED') return 'The request timed out. Please try again.';
  return err?.message || 'Something went wrong';
};

export const getFieldErrors = (err) => err?.response?.data?.errors || {};

export default api;
