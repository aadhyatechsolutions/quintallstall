import axiosInstance from "../../utils/axiosInstance";

// Fetch all reviews
export const fetchReviews = async () => {
  try {
    const { data, status } = await axiosInstance.get('/reviews');
    if (status !== 200) {
      throw new Error('Failed to fetch reviews');
    }
    return data.reviews;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch reviews');
  }
};

// Fetch reviews for a specific product
export const fetchReviewsByProductId = async (productId) => {
  try {
    const { data, status } = await axiosInstance.get(`/reviews/${productId}`);
    if (status !== 200) {
      throw new Error('Failed to fetch reviews for product');
    }
    return data.reviews;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch reviews for product');
  }
};

// Create a new review
export const createReview = async (reviewData) => {
  try {
    const { data, status } = await axiosInstance.post('/reviews', reviewData);
    if (status !== 201) {
      throw new Error('Failed to create review');
    }
    return data.review;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create review');
  }
};

// Update a review
export const updateReview = async (reviewData, reviewId) => {
  try {
    const { data, status } = await axiosInstance.put(`/reviews/${reviewId}`, reviewData);
    if (status !== 200) {
      throw new Error('Failed to update review');
    }
    return data.review;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update review');
  }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  try {
    const { data, status } = await axiosInstance.delete(`/reviews/${reviewId}`);
    if (status !== 200) {
      throw new Error('Failed to delete review');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete review');
  }
};

// Fetch reviews by rating (optional example)
export const fetchReviewsByRating = async (rating) => {
  try {
    const { data, status } = await axiosInstance.get(`/reviews/rating/${rating}`);
    if (status !== 200) {
      throw new Error('Failed to fetch reviews by rating');
    }
    return data.reviews;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch reviews by rating');
  }
};
