import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity = 1, overrideQuantity = false) => {
        const cart = get().cart;
        const existingIndex = cart.findIndex((item) => item.id === product.id);

        if (existingIndex !== -1) {
          const updatedCart = [...cart];
          const existingItem = updatedCart[existingIndex];

          updatedCart[existingIndex] = {
            ...existingItem,
            quantity: overrideQuantity
              ? quantity // ✅ override from Product Detail
              : existingItem.quantity + quantity, // ✅ increment from Card
          };

          set({ cart: updatedCart });
        } else {
          set({ cart: [...cart, { ...product, quantity }] });
        }
      },

      removeFromCart: (id) =>
        set({
          cart: get().cart.filter((item) => item.id !== id),
        }),

      clearCart: () => set({ cart: [] }),

      increaseQuantity: (id) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
      },

      decreaseQuantity: (id) => {
        set({
          cart: get()
            .cart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        });
      },

      getTotalItems: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);
