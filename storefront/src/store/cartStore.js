import { create } from "zustand";
import { persist } from "zustand/middleware";
import {addCartItem} from "../utils/cartService"
export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      syncStatus: 'idle', // 'idle' | 'syncing' | 'error'
      lastSyncError: null,

      // Add with immediate API sync
      addToCart: async (product, quantity = 1, overrideQuantity = false) => {
        try {
          set({ syncStatus: 'syncing' });
          
          const { cart } = get();
          const existingIndex = cart.findIndex((item) => item.id === product.id);

          // Optimistic update
          
          // Sync with backend
          const {success, message} = await addCartItem({ 
            product_id: product.id, 
            quantity: overrideQuantity ? quantity : (cart[existingIndex]?.quantity + quantity || quantity)
          });
          if(success){
            const newCart = existingIndex !== -1
            ? cart.map((item, idx) => 
                idx === existingIndex 
                  ? { 
                      ...item, 
                      quantity: overrideQuantity 
                        ? quantity 
                        : item.quantity + quantity 
                    } 
                  : item
              )
            : [...cart, { ...product, quantity }];

          set({ cart: newCart });

          }

          set({ syncStatus: 'idle' });
        } catch (error) {
          console.error("Sync failed:", error);
          set({ 
            syncStatus: 'error',
            lastSyncError: error.message,
            cart: get().cart // Revert to previous state
          });
        }
      },

      // Other methods need similar async handling...
      removeFromCart: async (id) => {
        try {
          set({ syncStatus: 'syncing' });
          await deleteCartItem(id);
          set({ 
            cart: get().cart.filter((item) => item.id !== id),
            syncStatus: 'idle' 
          });
        } catch (error) {
          // Handle error
        }
      },

      // ... rest of your methods
    }),
    {
      name: "cart-storage",
    }
  )
);  