import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchCurrentUser,fetchUsersByRoles } from "../utils/userService";

export const useUserStore = create(
  persist(
    (set) => ({
      currentUser: null,
      users: [],
      userStatus: "idle", // 'idle' | 'loading' | 'success' | 'error'
      userError: null,

      fetchCurrentUser: async () => {
        const result = await fetchCurrentUser();
        if (result.success) {
          set({ currentUser: result.data });
        } 
        else {
          console.error(result.error);
        }
      },

          // ✅ Set current user from profile API
      fetchCurrentUser: async () => {
        const result = await fetchCurrentUser();
        if (result.success) {
          set({ currentUser: result.data });
        } else {
          console.error("Failed to load current user:", result.error);
        }
      },

      fetchUsers: async () => {
        set({ userStatus: "loading", userError: null });

        const result = await fetchUsersByRoles(["retailer", "wholesaler"]);
        
        if (result.success) {
          set({
            users: result.data,
            userStatus: "success",
          });
        } else {
          set({
            userStatus: "error",
            userError: result.error,
          });
        }
      },

      resetUsers: () => {
        set({ users: [], userStatus: "idle", userError: null });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
