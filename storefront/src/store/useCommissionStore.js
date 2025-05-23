// stores/useCommissionStore.js
import { create } from "zustand";
import {
  fetchPlatformCommission,
  fetchWageCostCommission,
  fetchTaxes,
} from "../utils/commissions";

const useCommissionStore = create((set) => ({
  platformCommission: 0,    // Percentage (e.g., 10 for 10%)
  wageCost: 0,              // Fixed amount (e.g., 1500.00)
  wageCommissionRate: 0,     // Percentage (e.g., 15 for 15%)
  taxes: { cgst: 0, sgst: 0, igst: 0 },
  isLoading: false,
  error: null,

    fetchCommissions: async () => {
        set({ isLoading: true, error: null });
        try {
        console.log("Starting to fetch commissions...");
        
        const [platformCommission, wageData, taxes] = await Promise.all([
            fetchPlatformCommission(),
            fetchWageCostCommission(),
            fetchTaxes(),
        ]);
    
        console.log("API Responses:", {
            platformCommission,
            wageData,
            taxes
        });
    
        set({
            platformCommission,
            wageCost: wageData.cost,
            wageCommissionRate: wageData.commission,
            taxes,
            isLoading: false,
        });
        } catch (error) {
        console.error("Commission fetch error:", error);
        set({ error: "Failed to load commission data", isLoading: false });
        }
    },
}));

export default useCommissionStore;