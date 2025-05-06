// src/store/wishlistStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addWishlistItem, deleteWishlistItem, fetchWishlistItems } from "../utils/wishlistService";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: { items: [] },
      syncStatus: "idle",
      lastSyncError: null,

      // Add item to wishlist
      addToWishlist: async (product) => {
        try {
          set({ syncStatus: "syncing" });

          const wishlist = get().wishlist || { items: [] };
          const items = Array.isArray(wishlist.items) ? [...wishlist.items] : [];

          const existingIndex = items.findIndex((item) => item.product.id === product.id);

          if (existingIndex === -1) {
            const { success, message, item } = await addWishlistItem({
              product_id: product.id,
            });

            if (!success) throw new Error(message || "Failed to add item to wishlist");

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

      // Remove item from wishlist
      removeFromWishlist: async (id) => {
        try {
          set({ syncStatus: "syncing", lastSyncError: null });

          const wishlist = get().wishlist || { items: [] };
          const items = Array.isArray(wishlist.items) ? wishlist.items : [];

          const response = await deleteWishlistItem(id);
          if (!response.success) {
            set({
              wishlist: { ...wishlist, items },
              syncStatus: "error",
              lastSyncError: response.message,
            });
            return false;
          }

          const updatedItems = items.filter((item) => item.id !== id);
          set({ wishlist: { ...wishlist, items: updatedItems } });

          set({ syncStatus: "idle" });
          return true;
        } catch (error) {
          console.error("Remove from wishlist failed:", error);
          set({
            syncStatus: "error",
            lastSyncError: error.message,
          });
          return false;
        }
      },

      // Load wishlist from the server
      loadWishlist: async () => {
        try {
          set({ syncStatus: "syncing", lastSyncError: null });
          const data = await fetchWishlistItems();
          set({ wishlist: data, syncStatus: "idle" });
        } catch (error) {
          console.error("Load wishlist failed:", error);
          set({
            syncStatus: "error",
            lastSyncError: error.message,
          });
        }
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
