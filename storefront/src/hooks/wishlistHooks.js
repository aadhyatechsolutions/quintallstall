// src/hooks/wishlistHooks.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addWishlistItem, deleteWishlistItem, fetchWishlistItems } from "../utils/wishlistService";
import { useWishlistStore } from "../store/wishlistStore";

// Fetch wishlist
export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlistItems,
    onSuccess: (data) => {
      useWishlistStore.setState({
        wishlist: data,
        syncStatus: "idle",
      });
    },
    onError: (error) => {
      useWishlistStore.setState({
        syncStatus: "error",
        lastSyncError: error.message,
      });
    },
  });
};

// Wishlist mutations (add, remove)
export const useWishlistMutations = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addWishlistItem,
    onError: (error) => {
      useWishlistStore.setState({
        syncStatus: "error",
        lastSyncError: error.message,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWishlistItem,
    onSuccess: () => queryClient.invalidateQueries(["wishlist"]),
    onError: (error) => {
      // Handle error
    },
  });

  return {
    addToWishlist: addMutation.mutateAsync,
    removeFromWishlist: deleteMutation.mutateAsync,
    isLoading: addMutation.isLoading || deleteMutation.isLoading,
    error: addMutation.error || deleteMutation.error,
  };
};
