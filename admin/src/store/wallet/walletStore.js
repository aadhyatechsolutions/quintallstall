import { create } from 'zustand';
import {
  fetchWallets,
  createWallet,
  updateWallet,
  deleteWallet,
  fetchWalletById
} from './walletApi';

const useWalletStore = create((set) => ({
  wallets: [],
  currentWallet: null,
  loading: false,
  error: null,

  fetchWallets: async () => {
    set({ loading: true, error: null });
    try {
      const wallets = await fetchWallets();
      set({ wallets });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  addWallet: async (walletData) => {
    try {
      const newWallet = await createWallet(walletData);
      set((state) => ({
        wallets: [...state.wallets, newWallet],
      }));
      return newWallet;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  updateWallet: async (walletData, walletId) => {
    set({ loading: true, error: null });
    try {
      const updatedWallet = await updateWallet(walletData, walletId);
      set((state) => ({
        wallets: state.wallets.map((w) =>
          w.id === walletId ? updatedWallet : w
        ),
      }));
      return updatedWallet;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteWallet: async (walletId) => {
    try {
      await deleteWallet(walletId);
      set((state) => ({
        wallets: state.wallets.filter((w) => w.id !== walletId),
      }));
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  fetchWalletById: async (id) => {
    set({ loading: true, error: null });
    try {
      const wallet = await fetchWalletById(id);
      set({ currentWallet: wallet });
      return wallet;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useWalletStore;
