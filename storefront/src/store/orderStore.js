import { create } from "zustand";
import { persist } from "zustand/middleware";
import { placeOrder } from "../utils/orderService";

export const useOrderStore = create(
  persist(
    (set, get) => ({
      order: null,
      orderStatus: "pending",
      orderError: null,

      // Function to place an order
      placeOrder: async (orderPayload) => {
        try {
          set({ orderStatus: "placing" });

          // Call the API to place the order
          const orderData = await placeOrder(orderPayload);

          // Update the store with the order response (success)
          set({ order: orderData, orderStatus: "success" });
        } 
        catch (error) {
          console.error("Order placement failed:", error);
          set({ orderStatus: "error", orderError: error.message });
        }
      },

      // Reset the order state (could be useful after a successful order)
      resetOrder: () => {
        set({ order: null, orderStatus: "pending", orderError: null });
      },
    }),
    {
      name: "order-storage",
    }
  )
);
