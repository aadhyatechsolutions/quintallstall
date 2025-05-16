import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addWishlistItem,
  deleteWishlistItem,
  fetchWishlistItems,
} from "../utils/wishlistService";
import { useWishlistStore } from "../store/wishlistStore";

// Fetch wishlist hook
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

// Mutations for wishlist
export const useWishlistMutations = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation(addWishlistItem, {
    onSuccess: () => queryClient.invalidateQueries(["wishlist"]),
    onError: (error) => {
      useWishlistStore.setState({
        syncStatus: "error",
        lastSyncError: error.message,
      });
    },
  });

  const deleteMutation = useMutation(deleteWishlistItem, {
    onSuccess: () => queryClient.invalidateQueries(["wishlist"]),
    onError: (error) => {
      useWishlistStore.setState({
        syncStatus: "error",
        lastSyncError: error.message,
      });
    },
  });

  return {
    addToWishlist: addMutation.mutateAsync,
    removeFromWishlist: deleteMutation.mutateAsync,
    isLoading: addMutation.isLoading || deleteMutation.isLoading,
    error: addMutation.error || deleteMutation.error,
  };
};
