import {create} from "zustand";
import { fetchUsersByRole, fetchUserById, createUser, updateUser, deleteUser } from "./userApi";

const useUserStore = create((set) => ({
    users: [],
    isLoading: false,
    error: null,
    
    fetchUserById: async (userId) => {
        set({ isLoading: true });
        try {
            const user = await fetchUserById(userId); // Fetch user by ID
            set({ currentUser: user }); // Set the user data in state
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
    // Fetch users by role or all users if no role is provided
    fetchUsersByRole: async (role = '') => {
        set({ isLoading: true });
        try {
            const users = await fetchUsersByRole(role); // Pass role or empty string to fetch all users
            set({ users });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
    
    // Create a new user with a specific role
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
    
    // Update an existing user
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
    
    // Delete a user
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
