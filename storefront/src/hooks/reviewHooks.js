// hooks/reviewHooks.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";


const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// 🔹 Get all reviews
const fetchReviews = async () => {
  const { data } = await axiosInstance.get("/reviews");
  return data.reviews;
};

export const useReviews1 = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });
};

// 🔹 Get reviews by product ID
const fetchReviewsByProduct = async ({ queryKey }) => {
  const [, productId] = queryKey;
  const { data } = await axiosInstance.get(`/reviews/product/${productId}`);
  return data.reviews;
};

export const useReviews = (productId) =>
  useQuery({
    queryKey: ["reviews", productId],
    queryFn: fetchReviewsByProduct,
    enabled: !!productId,
  });


// 🔹 Get review by ID
const fetchReviewById = async ({ queryKey }) => {
  const [, id] = queryKey;
  const { data } = await axiosInstance.get(`/reviews/${id}`);
  return data.review;
};

export const useReview = (id) =>
  useQuery({
    queryKey: ["review", id],
    queryFn: fetchReviewById,
    enabled: !!id,
  });

// 🔹 Submit new review
export const useSubmitReview = (productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newReview) =>
      axiosInstance.post("/reviews", newReview, getAuthHeader()),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
    },
  });
};

// 🔹 Update review
export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...updated }) =>
      axiosInstance.put(`/reviews/${id}`, updated,getAuthHeader()),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });
};

// 🔹 Delete review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => axiosInstance.delete(`/reviews/${id}`,getAuthHeader()),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });
};
