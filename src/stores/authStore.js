// src/stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../utils/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      isOnline: navigator.onLine,
      networkStatus: navigator.onLine ? 'online' : 'offline',

      // ---- Helpers ----
      setUser: (user) => set({ user }),
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ loading }),
      setOnline: (status) => set({ isOnline: status }),
      setNetworkStatus: (status) => set({ networkStatus: status }),

      // ---- Actions ----
      checkConnection: async () => {
        if (!navigator.onLine) {
          set({ networkStatus: 'offline' });
          return 'offline';
        }
        try {
          const res = await fetch(
            `${
              import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
            }/health`,
            { method: 'GET', cache: 'no-store' }
          );
          const status = res.ok ? 'online' : 'server-down';
          set({ networkStatus: status });
          return status;
        } catch {
          set({ networkStatus: 'server-down' });
          return 'server-down';
        }
      },

      register: async (credentials) => {
        try {
          set({ loading: true, error: null });
          const res = await api.post('/auth/register', credentials);
          return res.data;
        } catch (err) {
          const message = err.response?.data?.message || 'Registration failed';
          set({ error: message });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      admin: async (credentials) => {
        try {
          set({ loading: true, error: null });
          const res = await api.post('/admin/add', credentials);
          return res.data;
        } catch (err) {
          const message = err.response?.data?.message || 'Registration failed';
          set({ error: message });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      login: async (credentials) => {
        try {
          set({ loading: true, error: null });
          const res = await api.post('/auth/login', credentials);
          // Cookies store tokens automatically; only save user in store
          set({ user: res.data.user });
          return res.data;
        } catch (err) {
          const message = err.response?.data?.message || 'Login failed';
          set({ error: message });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          set({ loading: true, error: null });
          await api.post('/auth/logout'); // server clears cookie
          set({ user: null });
        } catch (err) {
          console.error('Logout failed', err);
        } finally {
          set({ loading: false });
        }
      },

      fetchProfile: async () => {
        try {
          set({ loading: true });
          const res = await api.get('/auth/me');
          set({ user: res.data });
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || 'Failed to fetch profile',
          });
        } finally {
          set({ loading: false });
        }
      },

      // ---- OTP Actions ----
      requestOtp: async (email, purpose = 'email_verification') => {
        try {
          set({ loading: true, error: null });
          const res = await api.post('/auth/otp/request', { email, purpose });
          return res.data;
        } catch (err) {
          set({ error: err.response?.data?.message || 'OTP request failed' });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      verifyOtp: async (email, otp, purpose = 'email_verification') => {
        try {
          set({ loading: true, error: null });
          const res = await api.post('/auth/otp/verify', {
            email,
            otp,
            purpose,
          });
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || 'OTP verification failed',
          });
          throw err;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isOnline: state.isOnline,
      }),
    }
  )
);

// Browser events
if (typeof window !== 'undefined') {
  window.addEventListener('online', async () => {
    const ok = await checkApiHealth();
    useAuthStore.getState().setNetworkStatus(ok ? 'online' : 'server-down');
  });

  window.addEventListener('offline', () => {
    useAuthStore.getState().setNetworkStatus('offline');
  });
}

async function checkApiHealth() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/health`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}

setInterval(async () => {
  if (!navigator.onLine) {
    useAuthStore.getState().setNetworkStatus('offline');
    return;
  }
  const ok = await checkApiHealth();
  useAuthStore.getState().setNetworkStatus(ok ? 'online' : 'server-down');
}, 20000);
