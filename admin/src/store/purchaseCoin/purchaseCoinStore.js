import { create } from 'zustand';
import {
  fetchAllPurchasedCoins,
  fetchPurchaseCoins,
  addPurchaseCoin,
  // updatePurchaseCoin,
  // deletePurchaseCoin,
  // fetchPurchaseCoinById,
} from './purchaseCoinApi'; // Make sure these API functions exist

const usePurchaseCoinStore = create((set) => ({
  purchaseCoins: [],
  allPurchasedCoins: [],
  loading: false,
  error: null,
  currentPurchaseCoin: null,

   fetchAllPurchasedCoins: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAllPurchasedCoins();
      set({ allPurchasedCoins: data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
  // Fetch all purchase coins
  fetchPurchaseCoins: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchPurchaseCoins();
      set({ purchaseCoins: data });
    } catch (err) {
      set({ error: err.message,purchaseCoins:[] });
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
