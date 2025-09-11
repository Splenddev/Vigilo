import { create } from 'zustand';
import api from '../utils/api';

const useGroupStore = create((set, get) => ({
  groups: [],
  loading: false,
  error: null,

  // Create new group
  createGroup: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/groups/create', payload);
      set((state) => ({ groups: [...state.groups, res.data.group] }));
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Fetch lecturer’s groups
  fetchGroups: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/groups');
      set({ groups: res.data });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Upload roster for a group
  uploadRoster: async (groupId, rosterData, schoolId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post(`/groups/${groupId}/roster`, {
        rosterData,
        schoolId,
      });

      // Update group in store
      set((state) => ({
        groups: state.groups.map((g) =>
          g._id === groupId
            ? { ...g, studentsRosterId: res.data.roster._id }
            : g
        ),
      }));

      return res.data.roster;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useGroupStore;
