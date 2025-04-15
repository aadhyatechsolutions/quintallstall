import {create} from 'zustand';
import { fetchOrders, fetchOrderById, createOrder, updateOrderStatus, deleteOrder } from './orderApi';

const useOrderStore = create((set) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,

  // Fetch all orders
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await fetchOrders();
      set({ orders });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch a single order by its ID
  fetchOrderById: async (id) => {
    set({ loading: true, error: null });
    try {
      const order = await fetchOrderById(id);
      set({ currentOrder: order });
      return order;
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Create a new order
  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const newOrder = await createOrder(orderData);
      set((state) => ({
        orders: [...state.orders, newOrder],
      }));
      return newOrder;
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Update the order's status
  updateOrderStatus: async (orderId, status) => {
    set({ loading: true, error: null });
    try {
      const updatedOrder = await updateOrderStatus(orderId, status);
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === orderId ? updatedOrder : order
        ),
      }));
      return updatedOrder;
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Delete an order
  deleteOrder: async (orderId) => {
    set({ loading: true, error: null });
    try {
      await deleteOrder(orderId);
      set((state) => ({
        orders: state.orders.filter((order) => order.id !== orderId),
      }));
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useOrderStore;
