import { create } from 'zustand';
import { fetchApmcs, createApmc, updateApmc, deleteApmc } from './apmcApi'; 

const useApmcStore = create((set) => ({
  apmcs: [],
  loading: false,
  error: null,

  // Fetch all APMCs
  fetchApmcs: async () => {
    set({ loading: true, error: null });
    try {
      const apmcs = await fetchApmcs();
      set({ apmcs });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Create a new APMC
  createApmc: async (newApmc) => {
    set({ loading: true, error: null });
    try {
      const addedApmc = await createApmc(newApmc);
      set((state) => ({
        apmcs: [...state.apmcs, addedApmc],
      }));
      return addedApmc;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err; 
    }
  },
  
  // Update an existing APMC
  updateApmc: async (apmcData, apmcId) => {
    set({ loading: true, error: null });
    try {
      const updatedApmc = await updateApmc(apmcData, apmcId);
      set((state) => ({
        apmcs: state.apmcs.map((apmc) => (apmc.id === apmcId ? updatedApmc : apmc)),
      }));
      return updatedApmc;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err; 
    }
  },

  // Delete an APMC
  deleteApmc: async (apmcId) => {
    set({ loading: true, error: null });
    try {
      await deleteApmc(apmcId);
      set((state) => ({
        apmcs: state.apmcs.filter((apmc) => apmc.id !== apmcId),
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useApmcStore;
