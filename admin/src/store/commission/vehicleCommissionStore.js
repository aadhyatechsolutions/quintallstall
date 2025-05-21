import { create } from 'zustand';
import {
  fetchVehicleCommissions,
  addVehicleCommission,
  updateVehicleCommission,
  deleteVehicleCommission,
  fetchVehicleCommissionById,
} from './vehicleCommissionApi';

const useVehicleCommissionStore = create((set) => ({
  vehicleCommissions: [],
  loading: false,
  error: null,
  currentVehicleCommission: null,

  fetchVehicleCommissions: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchVehicleCommissions();
      set({ vehicleCommissions: data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  addVehicleCommission: async (newCommission) => {
    try {
      const added = await addVehicleCommission(newCommission);
      set((state) => ({
        vehicleCommissions: [...state.vehicleCommissions, added.data],
      }));
      return added;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  updateVehicleCommission: async (data, id) => {
    set({ loading: true, error: null });
    try {
      const updated = await updateVehicleCommission(data, id);
      set((state) => ({
        vehicleCommissions: state.vehicleCommissions.map((vc) =>
          vc.id === id ? updated.data : vc
        ),
      }));
      return updated;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteVehicleCommission: async (id) => {
    try {
      await deleteVehicleCommission(id);
      set((state) => ({
        vehicleCommissions: state.vehicleCommissions.filter((vc) => vc.id !== id),
      }));
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  fetchVehicleCommissionById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchVehicleCommissionById(id);
      set({ currentVehicleCommission: data });
      return data;
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useVehicleCommissionStore;
