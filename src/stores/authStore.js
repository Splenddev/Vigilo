// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/axiosInstance';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      error: null,

      // ---- Helpers ----
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      setUser: (user) => set({ user }),

      // ---- Actions ----
      register: async (credentials) => {
        try {
          set({ loading: true, error: null });
          const res = await api.post('/auth/register', credentials);
          return res.data;
        } catch (err) {
          set({ error: err.response?.data?.message || 'Registration failed' });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      login: async (credentials) => {
        try {
          set({ loading: true, error: null });
          const res = await api.post('/auth/login', credentials);
          set({
            user: res.data.user,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          });
          return res.data;
        } catch (err) {
          set({ error: err.response?.data?.message || 'Login failed' });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null });
      },

      fetchProfile: async () => {
        try {
          const res = await api.get('/auth/me');
          set({ user: res.data });
          return res.data;
        } catch (err) {
          set({ error: err.message || 'Failed to fetch profile' });
        }
      },
    }),
    {
      name: 'auth-storage', // key in localStorage
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
