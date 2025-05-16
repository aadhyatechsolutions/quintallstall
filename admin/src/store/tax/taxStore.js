import { create } from 'zustand';
import {
  createTax,
  updateTax,
  deleteTax,
  getAllTaxes, // <-- Make sure this function is implemented in taxApi.js
} from './taxApi';

const useTaxStore = create((set, get) => ({
  tax: null,
  taxes: [],
  loading: false,
  error: null,

  // Fetch all tax entries
  fetchAllTaxes: async () => {
    set({ loading: true, error: null });
    try {
      const allTaxes = await getAllTaxes();
      set({ taxes: allTaxes });
      return allTaxes;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Create a new tax entry
  addTax: async ({ cgst, sgst, igst }) => {
    set({ loading: true, error: null });
    try {
      const newTax = await createTax({ cgst, sgst, igst });
      set((state) => ({
        tax: newTax,
        taxes: [newTax, ...state.taxes], // Optionally add to list
      }));
      return newTax;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Update an existing tax entry
  updateTax: async (id, { cgst, sgst, igst }) => {
    set({ loading: true, error: null });
    try {
      const updatedTax = await updateTax(id, { cgst, sgst, igst });
      set((state) => ({
        tax: updatedTax,
        taxes: state.taxes.map((t) => (t.id === id ? updatedTax : t)),
      }));
      return updatedTax;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Delete a tax entry
  deleteTax: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteTax(id);
      set((state) => ({
        tax: null,
        taxes: state.taxes.filter((t) => t.id !== id),
      }));
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useTaxStore;
