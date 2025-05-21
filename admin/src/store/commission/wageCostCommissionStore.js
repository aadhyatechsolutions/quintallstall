import { create } from 'zustand';
import {
  fetchWageCostCommission,
  addWageCostCommission,
} from './wageCostCommissionApi';  // your API helper functions

const useWageCostCommissionStore = create((set) => ({
  wageCostCommission: null,
  loading: false,
  error: null,
  currentWageCostCommission: null,

  fetchWageCostCommission: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchWageCostCommission();
      set({ wageCostCommission: data });
      return data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  addWageCostCommission: async (newCommission) => {
    try {
      const added = await addWageCostCommission(newCommission);
      set({
        wageCostCommission: added,
      });
      return added;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },
}));

export default useWageCostCommissionStore;
