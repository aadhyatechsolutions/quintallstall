import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addWishlistItem,
  deleteWishlistItem,
  fetchWishlistItems,
} from "../utils/wishlistService";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: { items: [] },
      syncStatus: "idle",
      lastSyncError: null,

      addToWishlist: async (product) => {
        try {
          set({ syncStatus: "syncing", lastSyncError: null });

          const wishlist = get().wishlist || { items: [] };
          const items = Array.isArray(wishlist.items)
            ? [...wishlist.items]
            : [];

          const existingIndex = items.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingIndex === -1) {
            const { success, message, item } = await addWishlistItem({
              product_id: product.id,
            });

            if (!success)
              throw new Error(message || "Failed to add item to wishlist");

            items.push({ id: item.id, product });
          }

          set({ wishlist: { ...wishlist, items }, syncStatus: "idle" });
        } catch (error) {
          console.error("Add to wishlist failed:", error);
          set({
            syncStatus: "error",
            lastSyncError: error.message,
          });
        }
      },

      // Optimistic local removal - update state immediately
      removeFromWishlistLocal: (id) => {
        const wishlist = get().wishlist || { items: [] };
        const items = Array.isArray(wishlist.items) ? wishlist.items : [];
        const updatedItems = items.filter((item) => item.id !== id);
        set({ wishlist: { ...wishlist, items: updatedItems } });
      },

      // Remove item with optimistic update and rollback on failure
      removeFromWishlist: async (id) => {
        const wishlist = get().wishlist || { items: [] };
        const items = Array.isArray(wishlist.items) ? [...wishlist.items] : [];

        // Optimistically update UI
        set({
          wishlist: {
            ...wishlist,
            items: items.filter((item) => item.id !== id),
          },
          syncStatus: "syncing",
          lastSyncError: null,
        });

        try {
          const response = await deleteWishlistItem(id);

          if (!response.success) {
            // Rollback to previous items if API call fails
            set({
              wishlist: { ...wishlist, items },
              syncStatus: "error",
              lastSyncError: response.message,
            });
            return false;
          }

          // Success
          set({ syncStatus: "idle" });
          return true;
        } catch (error) {
          console.error("Remove from wishlist failed:", error);
          // Rollback to previous items on error
          set({
            wishlist: { ...wishlist, items },
            syncStatus: "error",
            lastSyncError: error.message,
          });
          return false;
        }
      },

      loadWishlist: async () => {
        try {
          set({ syncStatus: "syncing", lastSyncError: null });
          const data = await fetchWishlistItems();
          // console.log("Fetched wishlist data:", data);
          set({ wishlist: data, syncStatus: "idle" });
        } catch (error) {
          console.error("Load wishlist failed:", error);
          set({
            syncStatus: "error",
            lastSyncError: error.message,
            wishlist: { items: [] },
          });
        }
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
