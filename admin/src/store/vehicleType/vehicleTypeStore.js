import { create } from 'zustand';
import {
  fetchVehicleTypes,
  addVehicleType,
  updateVehicleType,
  deleteVehicleType,
  fetchVehicleTypeById,
} from './vehicleTypeApi';

const useVehicleTypeStore = create((set) => ({
  vehicleTypes: [],
  loading: false,
  error: null,
  currentVehicleType: null,

  fetchVehicleTypes: async () => {
    set({ loading: true, error: null });
    try {
      const vehicleTypes = await fetchVehicleTypes();
      set({ vehicleTypes });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  addVehicleType: async (newVehicleType) => {
    try {
      const addedVehicleType = await addVehicleType(newVehicleType);
      set((state) => ({
        vehicleTypes: [...state.vehicleTypes, addedVehicleType],
      }));
      return addedVehicleType;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  updateVehicleType: async (vehicleTypeData, vehicleTypeId) => {
    set({ loading: true, error: null });
    try {
      const updatedVehicleType = await updateVehicleType(vehicleTypeData, vehicleTypeId);
      set((state) => ({
        vehicleTypes: state.vehicleTypes.map((v) =>
          v.id === vehicleTypeId ? updatedVehicleType : v
        ),
      }));
      return updatedVehicleType;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteVehicleType: async (vehicleTypeId) => {
    try {
      await deleteVehicleType(vehicleTypeId);
      set((state) => ({
        vehicleTypes: state.vehicleTypes.filter((v) => v.id !== vehicleTypeId),
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchVehicleTypeById: async (id) => {
    set({ loading: true, error: null });
    try {
      const vehicleType = await fetchVehicleTypeById(id);
      set({ currentVehicleType: vehicleType });
      return vehicleType;
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useVehicleTypeStore;
