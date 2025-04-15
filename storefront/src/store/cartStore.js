// src/store/cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  fetchCartItems,
  addCartItem,
  deleteCartItem,
  updateCartItem,
  // clearCartOnServer, 
} from "../utils/cartService";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: { items: [] },
      syncStatus: "idle",
      lastSyncError: null,

      addToCart: async (product, quantity = 1, overrideQuantity = false) => {
        try {
          set({ syncStatus: "syncing" });

          const cart = get().cart || { items: [] };
          const items = Array.isArray(cart.items) ? [...cart.items] : [];

          const existingIndex = items.findIndex((item) => item.product.id === product.id);
          const newQuantity =
            overrideQuantity || existingIndex === -1
              ? quantity
              : items[existingIndex].quantity + quantity;

          const { success, message, item } = await addCartItem({
            product_id: product.id,
            quantity: newQuantity,
          });

          if (!success) throw new Error(message || "Failed to add item");

          if (existingIndex !== -1) {
            items[existingIndex].quantity = newQuantity;
          } else {
            items.push({id:item.id, price:item.price, product, quantity: newQuantity });
          }

          set({ cart: { ...cart, items }, syncStatus: "idle" });
        } catch (error) {
          console.error("Add to cart failed:", error);
          set({
            syncStatus: "error",
            lastSyncError: error.message,
          });
        }
      },

      removeFromCart: async (id) => {
        try {
          set({ syncStatus: "syncing", lastSyncError: null });

          const cart = get().cart || { items: [] };
          const items = Array.isArray(cart.items) ? cart.items : [];

          

          const response = await deleteCartItem(id);
          if (!response.success) {
            set({
              cart: { ...cart, items },
              syncStatus: "error",
              lastSyncError: response.message,
            });
            return false;
          }
          const updatedItems = items.filter((item) => item.id !== id);
          set({ cart: { ...cart, items: updatedItems } });

          set({ syncStatus: "idle" });
          return true;
        } catch (error) {
          console.error("Remove from cart failed:", error);
          set({
            syncStatus: "error",
            lastSyncError: error.message,
          });
          return false;
        }
      },

      clearCart: async () => {
        const cart = get().cart || { items: [] };
        set({ cart: { ...cart, items: [] } });

        // Optional: Uncomment this if server supports clearing cart
        // try {
        //   set({ syncStatus: "syncing" });
        //   await clearCartOnServer();
        //   set({ syncStatus: "idle" });
        // } catch (error) {
        //   console.error("Clear cart failed:", error);
        //   set({
        //     syncStatus: "error",
        //     lastSyncError: error.message,
        //   });
        // }
      },

      increaseQuantity: async (id) => {
        const cart = get().cart || { items: [] };
        const items = [...cart.items];
        const item = items.find((item) => item.id === id);
        if (!item) return;
      
        const newQuantity = item.quantity + 1;
        set({
          cart: {
            ...cart,
            items: items.map((i) =>
              i.id === id ? { ...i, quantity: newQuantity } : i
            ),
          },
        });
      
        try {
          await updateCartItem({ id, quantity: newQuantity });
        } catch (error) {
          console.error("Update quantity failed:", error);
        }
      },
      
      decreaseQuantity: async (id) => {
        const cart = get().cart || { items: [] };
        const items = [...cart.items];
        const item = items.find((item) => item.id === id);
        if (!item || item.quantity <= 1) return;
      
        const newQuantity = item.quantity - 1;
        set({
          cart: {
            ...cart,
            items: items.map((i) =>
              i.id === id ? { ...i, quantity: newQuantity } : i
            ),
          },
        });
      
        try {
          await updateCartItem({ id, quantity: newQuantity }); // Pass both id and newQuantity
        } catch (error) {
          console.error("Update quantity failed:", error);
        }
      },
      

      updateQuantity: async (id, quantity) => {
        const cart = get().cart || { items: [] };
        const items = [...cart.items];

        set({
          cart: {
            ...cart,
            items: items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          },
        });

        try {
          await updateCartItem(id, quantity);
        } catch (error) {
          console.error("Update quantity failed:", error);
        }
      },

      getTotalItems: () => {
        const cart = get().cart || { items: [] };
        return cart.items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalUniqueItems: () => {
        const cart = get().cart || { items: [] };
        return cart.items.length;
      },

      getTotalPrice: () => {
        const cart = get().cart || { items: [] };
        return cart.items.reduce(
          (total, item) =>
            total + parseFloat(item.product.price || 0) * item.quantity,
          0
        );
      },

      loadCart: async () => {
        try {
          set({ syncStatus: "syncing", lastSyncError: null });
          const data = await fetchCartItems();
          set({ cart: data.cart, syncStatus: "idle" });
        } catch (error) {
          console.error("Load cart failed:", error);
          set({
            syncStatus: "error",
            lastSyncError: error.message,
          });
        }
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
