// src/api/axiosInstance.js
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true, // send cookies with every request
});

// ✅ Request interceptor
api.interceptors.request.use(
  (config) => {
    // If you ever need to attach extra headers (not tokens)
    const { user } = useAuthStore.getState();
    if (user) {
      config.headers['X-User-Id'] = user.id; // optional, remove if not needed
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { logout } = useAuthStore.getState();

    // If 401, session expired → logout user
    if (error.response?.status === 401) {
      logout();
    }

    return Promise.reject(error);
  }
);

export default api;
