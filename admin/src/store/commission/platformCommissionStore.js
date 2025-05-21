import { create } from 'zustand';
import {
  fetchPlatformCommission,
  addPlatformCommission,
} from './platformCommissionApi';

const usePlatformCommissionStore = create((set) => ({
  platformCommission: null,
  loading: false,
  error: null,
  currentPlatformCommission: null,

  fetchPlatformCommission: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchPlatformCommission();
      set({ platformCommission: data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  addPlatformCommission: async (newCommission) => {
    try {
      const added = await addPlatformCommission(newCommission);
      set((state) => ({
        platformCommission: added,
      }));
      return added;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },


}));

export default usePlatformCommissionStore;
