import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true,
});

// ---- REQUEST INTERCEPTOR ----
api.interceptors.request.use(
  (config) => {
    const { user } = useAuthStore.getState();
    if (user) {
      config.headers['X-User-Id'] = user.id;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---- RESPONSE INTERCEPTOR ----
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { logout, setOnline } = useAuthStore.getState();

    if (!error.response) {
      setOnline(false);
      console.warn('⚠️ Network offline or server unreachable');
    } else {
      setOnline(true);

    }

    return Promise.reject(error);
  }
);

export default api;
