import {create} from "zustand";
import { fetchUsers, fetchUsersByRoles, fetchUserById, createUser, updateUser, deleteUser } from "./userApi";

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
    
    fetchUsersByRoles: async (role = []) => {
        set({ isLoading: true });
        try {
            const users = await fetchUsersByRoles(role); 
            set({ users });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
    
    
    createUser: async (userData, role) => {
        set({ isLoading: true, error: null });
        try {
            const newUser = await createUser(userData, role);
            set((state) => ({ users: [...state.users, newUser] }));
        } catch (error) {
            if(error.status == 422){
                throw new Error(error.response.data.message);
            }else{
                throw new Error(error.message);
            }
        } finally {
            set({ isLoading: false });
        }
    },
    
    
    updateUser: async (userId, userData, role) => {
        set({ isLoading: true, error: null });
        try {
            const updatedUser = await updateUser(userId, userData, role);
            set((state) => ({
                users: state.users.map((user) => user.id === userId ? updatedUser : user)
            }));
        } catch (error) {
            if(error.status == 422){
                set({ error: error.response.data.message });
            }else{
                set({ error: error.message });
            }
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
