import { create } from 'zustand';
import {
  fetchSpecialOffers,
  fetchSpecialOfferById,
  createSpecialOffer,
  updateSpecialOffer,
  deleteSpecialOffer,
} from './specialOfferApi';

const useSpecialOfferStore = create((set) => ({
  specialOffers: [],
  loading: false,
  error: null,
  currentSpecialOffer: null,

  fetchSpecialOffers: async () => {
    set({ loading: true, error: null });
    try {
      const specialOffers = await fetchSpecialOffers();
      set({ specialOffers });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchSpecialOfferById: async (id) => {
    set({ loading: true, error: null });
    try {
      const specialOffer = await fetchSpecialOfferById(id);
      set({ currentSpecialOffer: specialOffer });
      return specialOffer;
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  createSpecialOffer: async (newOffer) => {
    set({ loading: true, error: null });
    try {
      const createdOffer = await createSpecialOffer(newOffer);
      set((state) => ({
        specialOffers: [...state.specialOffers, createdOffer],
      }));
      return createdOffer;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateSpecialOffer: async (offerData, offerId) => {
    set({ loading: true, error: null });
    try {
      const updatedOffer = await updateSpecialOffer(offerData ,offerId);
      set((state) => ({
        specialOffers: state.specialOffers.map((offer) =>
          offer.id === offerId ? updatedOffer.data : offer
        ),
      }));
      return updatedOffer.data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteSpecialOffer: async (offerId) => {
    set({ loading: true, error: null });
    try {
      const res = await deleteSpecialOffer(offerId);
      set((state) => ({
        specialOffers: state.specialOffers.filter((offer) => offer.id !== offerId),
      }));
      return res;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useSpecialOfferStore;
