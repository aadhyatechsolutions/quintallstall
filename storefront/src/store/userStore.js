import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchUsersByRoles } from "../utils/userService";

export const useUserStore = create(
  persist(
    (set) => ({
      users: [],
      userStatus: "idle", // 'idle' | 'loading' | 'success' | 'error'
      userError: null,

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
