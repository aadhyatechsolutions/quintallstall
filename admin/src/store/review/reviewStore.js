import { create } from 'zustand';
import { fetchReviews, fetchReviewsByProductId, createReview, updateReview, deleteReview } from './reviewApi'; 

const useReviewStore = create((set) => ({
  reviews: [],
  loading: false,
  error: null,
  
  // Fetch all reviews
  fetchReviews: async () => {
    set({ loading: true, error: null });
    try {
      const reviews = await fetchReviews();
      set({ reviews });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch reviews by productId
  fetchReviewsByProductId: async (productId) => {
    set({ loading: true, error: null });
    try {
      const reviews = await fetchReviewsByProductId(productId);
      set({ reviews });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Create a new review
  createReview: async (reviewData) => {
    set({ loading: true, error: null });
    try {
      const newReview = await createReview(reviewData);
      set((state) => ({
        reviews: [...state.reviews, newReview],
      }));
      return newReview;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Update an existing review
  updateReview: async (reviewData, reviewId) => {
    set({ loading: true, error: null });
    try {
      const updatedReview = await updateReview(reviewData, reviewId);
      set((state) => ({
        reviews: state.reviews.map((review) =>
          review.id === reviewId ? updatedReview : review
        ),
      }));
      return updatedReview;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Delete a review
  deleteReview: async (reviewId) => {
    set({ loading: true, error: null });
    try {
      await deleteReview(reviewId);
      set((state) => ({
        reviews: state.reviews.filter((review) => review.id !== reviewId),
      }));
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useReviewStore;
