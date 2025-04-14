import { create } from 'zustand';
import { fetchCoins, createCoin, updateCoin, deleteCoin, fetchCoinById } from './coinApi';

const useCoinStore = create((set) => ({
  coins: [],
  loading: false,
  error: null,
  currentCoin: null,

  fetchCoins: async () => {
    set({ loading: true, error: null });
    try {
      const coins = await fetchCoins();
      set({ coins });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  addCoin: async (newCoin) => {
    try {
      const addedCoin = await createCoin(newCoin);
      set((state) => ({
        coins: [...state.coins, addedCoin],
      }));
      return addedCoin;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  updateCoin: async (coinData, coinId) => {
    set({ loading: true, error: null });
    try {
      const updatedCoin = await updateCoin(coinData, coinId);
      set((state) => ({
        coins: state.coins.map((coin) =>
          coin.id === coinId ? updatedCoin : coin
        ),
      }));
      return updatedCoin;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  deleteCoin: async (coinId) => {
    set({ loading: false, error: null });
    try {
      const deletedCoin = await deleteCoin(coinId);
      set((state) => ({
        coins: state.coins.filter((coin) => coin.id !== coinId),
      }));
      return deletedCoin;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchCoinById: async (id) => {
    set({ loading: true, error: null });
    try {
      const coin = await fetchCoinById(id);
      return coin;
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCoinStore;
