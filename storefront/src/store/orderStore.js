import { create } from "zustand";
import { persist } from "zustand/middleware";
import { placeOrder } from "../utils/orderService";

export const useOrderStore = create(
  persist(
    (set, get) => ({
      order: null,
      orderStatus: "idle", // 'idle' | 'placing' | 'success' | 'error'
      orderError: null,

      placeOrder: async (orderPayload) => {
        set({ orderStatus: "placing", orderError: null });
        
        const result = await placeOrder(orderPayload);
        
        if (result.success) {
          set({
            order: result.data,
            orderStatus: "success",
            orderError: null,
          });
          return { success: true, data: result.data };
        } else {
          set({
            orderStatus: "error",
            orderError: result.error,
          });
          return { success: false, error: result.error };
        }
      },

      resetOrder: () => {
        set({ 
          order: null, 
          orderStatus: "idle", 
          orderError: null 
        });
      },
    }),
    {
      name: "order-storage",
    }
  )
);