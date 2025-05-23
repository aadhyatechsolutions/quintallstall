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
          // Validate product exists and has an ID
          if (!product?.id) {
            throw new Error("Invalid product: missing ID");
          }

          set({ syncStatus: "syncing", lastSyncError: null });

          const wishlist = get().wishlist || { items: [] };
          const items = Array.isArray(wishlist.items)
            ? [...wishlist.items]
            : [];

          const existingIndex = items.findIndex(
            (item) => item.product?.id === product.id
          );

          if (existingIndex === -1) {
            const response = await addWishlistItem({
              product_id: product.id,
            });

            if (!response.success) {
              throw new Error(
                response.message || "Failed to add item to wishlist"
              );
            }

            // Handle different possible response structures
            const wishlistItemId =
              response.item?.id || response.item?.wishlist_item?.id;
            if (!wishlistItemId) {
              throw new Error("Invalid response: missing wishlist item ID");
            }

            items.push({
              id: wishlistItemId, // The ID returned from the API
              product: product, // The full product object
            });
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

      removeFromWishlistLocal: (id) => {
        const wishlist = get().wishlist || { items: [] };
        const items = Array.isArray(wishlist.items) ? wishlist.items : [];
        const updatedItems = items.filter((item) => item.id !== id);
        set({ wishlist: { ...wishlist, items: updatedItems } });
      },

      removeFromWishlist: (id) => {
        const wishlist = get().wishlist || { items: [] };
        const items = Array.isArray(wishlist.items) ? [...wishlist.items] : [];
      
        set({
          wishlist: {
            ...wishlist,
            items: items.filter((item) => item.id !== id),
          },
          syncStatus: "idle",
          lastSyncError: null,
        });
      },
      

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
