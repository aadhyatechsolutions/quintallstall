import {create} from "zustand";
import { fetchRoles, createRole, fetchRoleById, updateRole, deleteRole } from "./roleApi";

const useRoleStore = create((set) => ({
  roles: [],
  loading: false,
  error: null,
  
  fetchRoleById: async (id) => {
    set({ loading: true, error: null });
    try {
      const role = await fetchRoleById(id);
      set({ selectedRole: role, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchRoles: async () => {
    set({ loading: true, error: null });
    try {
      const roles = await fetchRoles();
      set({ roles, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  createRole: async (roleData) => {
    set({ isLoading: true });

    try {
        const newRole = await createRole(roleData); 
        set((state) => ({
            roles: [...state.roles, newRole], 
            error: null
        }));
    } catch (error) {
        if (error.response?.status === 422) {
            set({ error: error.response.data.message }); 
        } else {
            set({ error: error.message || "Something went wrong" });
        }
    } finally {
        set({ isLoading: false });
    }
  },
  updateRole: async (id, roleData) => {
    set({ isLoading: true });
    try {
      const updatedRole = await updateRole(id, roleData);
      set((state) => ({
        roles: state.roles.map((role) =>
          role.id === id ? updatedRole : role
        ),
        error: null
      }));
    } catch (error) {
      set({ error: error?.response?.data?.message || error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteRole: async (id) => {
    set({ loading: false, error: null });
    try {
      await deleteRole(id);
      set((state) => ({
        roles: state.roles.filter((role) => role.id !== id),
        error: null
      }));
    } catch (error) {
      set({ error: error?.message || "Failed to delete role" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useRoleStore;
