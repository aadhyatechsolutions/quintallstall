// src/store/role/roleStore.js

import {create} from "zustand";
import { fetchRoles as fetchRolesApi } from "./roleApi";  // Import the API function

const useRoleStore = create((set) => ({
  roles: [],
  loading: false,
  error: null,
  
  // Fetch roles from API
  fetchRoles: async () => {
    set({ loading: true, error: null });
    try {
      const roles = await fetchRolesApi();
      set({ roles, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useRoleStore;
