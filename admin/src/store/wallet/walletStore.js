import { create } from 'zustand';
import {
  fetchWallet,
  updateWallet,
  deleteWallet,
  addCoin,
} from './walletApi';

const useWalletStore = create((set, get) => ({
  wallet: null,
  loading: false,
  error: null,
  walletValue: 0,

  // Fetch the current user's wallet
  fetchWallet: async () => {
    set({ loading: true, error: null });
    try {
      const wallet = await fetchWallet(); // assumes API returns current user's wallet
      set({ wallet, walletValue: wallet.amount });
      return wallet;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  addWallet: async (walletData) => {
    try {
      const newWallet = await createWallet(walletData);
      set({ wallet: newWallet, walletValue: newWallet.amount });
      return newWallet;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  addCoin: async ({ coin_id, quantity }) => {
    set({ loading: true, error: null });
    try {
      const { wallet } = await addCoin({ coin_id, quantity });
      set({ wallet, walletValue: wallet.amount });
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateStatus: async (status) => {
    set({ loading: true, error: null });
    try {
      const updatedWallet = await updateWallet(status);
      set({ wallet: updatedWallet });
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useWalletStore;
