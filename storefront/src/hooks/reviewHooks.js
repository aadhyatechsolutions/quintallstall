// hooks/reviewHooks.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

// 🔹 Get all reviews
const fetchReviews = async () => {
  const { data } = await axiosInstance.get("/reviews");
  return data.reviews;
};

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });
};

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
export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newReview) => axiosInstance.post("/reviews", newReview),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });
};

// 🔹 Update review
export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...updated }) =>
      axiosInstance.put(`/reviews/${id}`, updated),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });
};

// 🔹 Delete review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => axiosInstance.delete(`/reviews/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });
};
