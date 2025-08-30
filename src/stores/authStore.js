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
      isOnline: navigator.onLine, // ✅ track network state

      // ---- Helpers ----
      setUser: (user) => set({ user }),
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ loading }),
      setOnline: (status) => set({ isOnline: status }),

      // ---- Actions ----
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
        isOnline: state.isOnline, // ✅ persist network state
      }),
    }
  )
);

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    useAuthStore.getState().setOnline(true);
  });
  window.addEventListener('offline', () => {
    useAuthStore.getState().setOnline(false);
  });
}
