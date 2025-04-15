// src/store/useCartStore.js

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addCartItem, deleteCartItem } from "../utils/cartService";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      syncStatus: "idle", // 'idle' | 'syncing' | 'error'
      lastSyncError: null,

      // Add item to cart with backend sync
      addToCart: async (product, quantity = 1, overrideQuantity = false) => {
        try {
          set({ syncStatus: "syncing" });
          const cart = get().cart;
          const existingIndex = cart.findIndex((item) => item.id === product.id);
          const newQuantity =
            overrideQuantity || existingIndex === -1
              ? quantity
              : cart[existingIndex].quantity + quantity;

          // Backend API sync
          const { success, message } = await addCartItem({
            product_id: product.id,
            quantity: newQuantity,
          });

          if (!success) throw new Error(message || "Failed to add item");

          // Local state update
          const updatedCart =
            existingIndex !== -1
              ? cart.map((item, idx) =>
                  idx === existingIndex
                    ? { ...item, quantity: newQuantity }
                    : item
                )
              : [...cart, { ...product, quantity }];

          set({ cart: updatedCart, syncStatus: "idle" });
        } catch (error) {
          console.error("Sync failed:", error);
          set({
            syncStatus: "error",
            lastSyncError: error.message,
          });
        }
      },

      // Remove item from cart and backend
      removeFromCart: async (id) => {
        try {
          set({ syncStatus: "syncing", lastSyncError: null });
          
          // Wait for API confirmation before updating local state
          const response = await deleteCartItem(id);
          
          if (!response.success) {
            throw new Error(response.message || "Failed to delete item");
          }
      
          set({
            cart: get().cart.filter((item) => item.id !== id),
            syncStatus: "idle",
          });
          
          return true; // Indicate success
        } catch (error) {
          console.error("Remove failed:", error);
          set({
            syncStatus: "error",
            lastSyncError: error.message || "Failed to remove item from server",
          });
          return false; // Indicate failure
        }
      },

      // Clear all items (local only)
      clearCart: () => set({ cart: [] }),

      // Increase item quantity (local)
      increaseQuantity: (id) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
      },

      // Decrease item quantity (local)
      decreaseQuantity: (id) => {
        set({
          cart: get()
            .cart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        });
      },

      // Update item quantity directly
      updateQuantity: (id, quantity) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      // Get total item count
      getTotalItems: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),

      // Get total price
      getTotalPrice: () =>
        get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
    }
  )
);
