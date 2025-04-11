import { create } from "zustand";
import { getVehicleTypes } from "./vehicleApi";

const useVehicleStore = create((set) => ({
  vehicleTypes: [],
  vehicleTypesLoading: false,
  vehicleTypesError: null,

  fetchVehicleTypes: async () => {
    set({ vehicleTypesLoading: true, vehicleTypesError: null });
    try {
      const types = await getVehicleTypes();
      set({ vehicleTypes: types, vehicleTypesLoading: false });
    } catch (error) {
      set({
        vehicleTypesError: error.message || "Failed to load vehicle types",
        vehicleTypesLoading: false,
      });
    }
  },
}));

export default useVehicleStore;
