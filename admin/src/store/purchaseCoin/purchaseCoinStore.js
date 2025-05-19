import { create } from 'zustand';
import {
  fetchAllPurchaseCoins,
  addPurchaseCoin,
  // updatePurchaseCoin,
  // deletePurchaseCoin,
  // fetchPurchaseCoinById,
} from './purchaseCoinApi'; // Make sure these API functions exist

const usePurchaseCoinStore = create((set) => ({
  purchaseCoins: [],
  loading: false,
  error: null,
  currentPurchaseCoin: null,

  // Fetch all purchase coins
  fetchPurchaseCoins: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAllPurchaseCoins();
      set({ purchaseCoins: data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Add a new purchase coin
  addPurchaseCoin: async (newPurchase) => {
    try {
      const added = await addPurchaseCoin(newPurchase);
      set((state) => ({
        purchaseCoins: [...state.purchaseCoins, added],
      }));
      return added;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

}));

export default usePurchaseCoinStore;
