import { create } from 'zustand';
import api from '../utils/api';

const API_URL = `/school`;

export const useSchoolStore = create((set) => ({
  schools: [],
  selectedSchool: null,
  loading: false,
  error: null,

  fetchSchools: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(API_URL, { withCredentials: true });
      set({ schools: data.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Failed to load schools',
        loading: false,
      });
    }
  },

  createSchool: async (schoolData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post(API_URL, schoolData, {
        withCredentials: true,
      });
      set((state) => ({
        schools: [...state.schools, data.data],
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Failed to create school',
        loading: false,
      });
    }
  },
  selectSchool: (school) => set({ selectedSchool: school }),
}));
