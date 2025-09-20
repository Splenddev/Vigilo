// src/stores/notificationStore.js
import { create } from 'zustand';
import api from '../utils/api';

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  loading: {
    fetching: false,
    deleting: false,
    deletingAll: false,
    markingRead: false,
    markingAllRead: false,
  },
  error: null,

  // --- FETCH NOTIFICATIONS ---
  fetchNotifications: async () => {
    set((state) => ({
      loading: { ...state.loading, fetching: true },
      error: null,
    }));
    try {
      const res = await api.get('/notifications');
      set((state) => ({
        notifications: res.data.notifications || [],
        loading: { ...state.loading, fetching: false },
      }));
    } catch (err) {
      set((state) => ({
        error: err.response?.data?.message || 'Failed to fetch notifications',
        loading: { ...state.loading, fetching: false },
      }));
    }
  },

  // --- DELETE SINGLE ---
  deleteNotification: async (id) => {
    set((state) => ({
      loading: { ...state.loading, deleting: true },
      error: null,
    }));
    try {
      await api.delete(`/notifications/${id}`);
      set((state) => ({
        notifications: state.notifications.filter((n) => n._id !== id),
        loading: { ...state.loading, deleting: false },
      }));
    } catch (err) {
      set((state) => ({
        error: err.response?.data?.message || 'Failed to delete notification',
        loading: { ...state.loading, deleting: false },
      }));
    }
  },

  // --- DELETE ALL ---
  deleteAllNotifications: async () => {
    set((state) => ({
      loading: { ...state.loading, deletingAll: true },
      error: null,
    }));
    try {
      await api.delete('/notifications');
      set((state) => ({
        notifications: [],
        loading: { ...state.loading, deletingAll: false },
      }));
    } catch (err) {
      set((state) => ({
        error:
          err.response?.data?.message || 'Failed to delete all notifications',
        loading: { ...state.loading, deletingAll: false },
      }));
    }
  },

  // --- MARK READ ---
  markAsRead: async (id) => {
    set((state) => ({
      loading: { ...state.loading, markingRead: true },
      error: null,
    }));
    try {
      await api.patch(`/notifications/${id}/read`);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n._id === id ? { ...n, read: true } : n
        ),
        loading: { ...state.loading, markingRead: false },
      }));
    } catch (err) {
      set((state) => ({
        error:
          err.response?.data?.message || 'Failed to mark notification as read',
        loading: { ...state.loading, markingRead: false },
      }));
    }
  },

  // --- MARK ALL READ ---
  markAllAsRead: async () => {
    set((state) => ({
      loading: { ...state.loading, markingAllRead: true },
      error: null,
    }));
    try {
      await api.patch('/notifications/read-all');
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        loading: { ...state.loading, markingAllRead: false },
      }));
    } catch (err) {
      set((state) => ({
        error: err.response?.data?.message || 'Failed to mark all as read',
        loading: { ...state.loading, markingAllRead: false },
      }));
    }
  },
}));
