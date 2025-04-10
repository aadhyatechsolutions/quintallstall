import {create} from "zustand";
import { fetchUsers, fetchUsersByRole, fetchUserById, createUser, updateUser, deleteUser } from "./userApi";

const useUserStore = create((set) => ({
    users: [],
    isLoading: false,
    error: null,
    
    fetchUsers: async () => {
        set({ isLoading: true });
        try {
          const users = await fetchUsers(); 
          set({ users }); 
        } catch (error) {
          set({ error: error.message });
        } finally {
          set({ isLoading: false });
        }
      },
    fetchUserById: async (userId) => {
        set({ isLoading: true });
        try {
            const user = await fetchUserById(userId); 
            set({ currentUser: user }); 
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
    
    fetchUsersByRole: async (role = '') => {
        set({ isLoading: true });
        try {
            const users = await fetchUsersByRole(role); 
            set({ users });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
    
    
    createUser: async (userData, role) => {
        set({ isLoading: true });
        try {
            const newUser = await createUser(userData, role);
            set((state) => ({ users: [...state.users, newUser] }));
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
    
    
    updateUser: async (userId, userData, role) => {
        set({ isLoading: true });
        try {
            const updatedUser = await updateUser(userId, userData, role);
            set((state) => ({
                users: state.users.map((user) => user.id === userId ? updatedUser : user)
            }));
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
    
    
    deleteUser: async (userId) => {
        set({ isLoading: true });
        try {
            await deleteUser(userId);
            set((state) => ({
                users: state.users.filter((user) => user.id !== userId)
            }));
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default useUserStore;
