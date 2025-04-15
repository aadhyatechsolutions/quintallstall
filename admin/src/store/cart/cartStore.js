import { create } from 'zustand';
import {
  fetchCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart
} from './cartApi';

const useCartStore = create((set) => ({
  cartItems: [],
  loading: false,
  error: null,

  // Fetch all cart items
  fetchCartItems: async () => {
    set({ loading: true, error: null });
    try {
      const cartItems = await fetchCartItems();
      set({ cartItems });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Add item to cart
  addToCart: async (itemData) => {
    try {
      const newItem = await addToCart(itemData);
      set((state) => ({
        cartItems: [...state.cartItems, newItem],
      }));
      return newItem;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  // Update existing cart item
  updateCartItem: async (itemId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const updatedItem = await updateCartItem(itemId, updatedData);
      set((state) => ({
        cartItems: state.cartItems.map(item =>
          item.id === itemId ? updatedItem : item
        ),
      }));
      return updatedItem;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Delete item from cart
  deleteCartItem: async (itemId) => {
    try {
      await deleteCartItem(itemId);
      set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== itemId),
      }));
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      await clearCart();
      set({ cartItems: [] });
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },
}));

export default useCartStore;
