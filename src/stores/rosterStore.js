import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';
import api from '../utils/api';

const API_URL = '/rosters'; // adjust to match backend

const rosterStore = create(
  devtools((set, get) => ({
    rosters: [],
    activeRoster: null,
    loading: false,
    error: null,

    // 🔹 Fetch all rosters
    fetchRosters: async (groupId) => {
      set(
        produce((state) => {
          state.loading = true;
          state.error = null;
        })
      );
      try {
        const { data } = await api.get(`${API_URL}/${groupId}`);
        set(
          produce((state) => {
            state.rosters = data.roster;
            state.loading = false;
          })
        );
      } catch (err) {
        set(
          produce((state) => {
            state.error = err.response?.data?.message || err.message;
            state.loading = false;
          })
        );
      }
    },

    // 🔹 Fetch single roster by ID
    fetchRosterById: async (id) => {
      set(
        produce((state) => {
          state.loading = true;
          state.error = null;
        })
      );
      try {
        const { data } = await api.get(`${API_URL}/${id}`);
        set(
          produce((state) => {
            state.activeRoster = data;
            state.loading = false;
          })
        );
      } catch (err) {
        set(
          produce((state) => {
            state.error = err.response?.data?.message || err.message;
            state.loading = false;
          })
        );
      }
    },

    // 🔹 Create roster (with CSV upload)
    createRoster: async ({ groupId, students, file, session }) => {
      set(
        produce((state) => {
          state.loading = true;
          state.error = null;
        })
      );
      try {
        // Build form data
        const formData = new FormData();
        formData.append('groupId', groupId);
        formData.append('session', session);
        formData.append('students', JSON.stringify(students));
        formData.append('roster', file);

        const { data } = await api.post(API_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        set(
          produce((state) => {
            state.rosters.push(data.roster);
            state.loading = false;
          })
        );

        return data;
      } catch (err) {
        set(
          produce((state) => {
            state.error = err.response?.data?.message || err.message;
            state.loading = false;
          })
        );
        throw err;
      }
    },

    // 🔹 Delete roster
    deleteRoster: async (id) => {
      set(
        produce((state) => {
          state.loading = true;
          state.error = null;
        })
      );
      try {
        await api.delete(`${API_URL}/${id}`);
        set(
          produce((state) => {
            state.rosters = state.rosters.filter((r) => r._id !== id);
            state.loading = false;
          })
        );
      } catch (err) {
        set(
          produce((state) => {
            state.error = err.response?.data?.message || err.message;
            state.loading = false;
          })
        );
      }
    },
  }))
);

export default rosterStore;
