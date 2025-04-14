import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCartItems, addCartItem, updateCartItem, deleteCartItem } from "../utils/cartService";
import { useCartStore } from "../store/cartStore";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartItems,
    onSuccess: (data) => {
      useCartStore.setState({ 
        cart: data,
        syncStatus: 'idle'
      });
    },
    onError: (error) => {
      useCartStore.setState({
        syncStatus: 'error',
        lastSyncError: error.message
      });
    }
  });
};

export const useCartMutations = () => {
  const queryClient = useQueryClient();
  
  const addMutation = useMutation({
    mutationFn: addCartItem,
    onError: (error) => {
      useCartStore.setState({
        syncStatus: 'error',
        lastSyncError: error.message
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
    onError: (error) => {
      // Handle error
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
    onError: (error) => {
      // Handle error
    }
  });

  return {
    addToCart: addMutation.mutateAsync,
    updateCartItem: updateMutation.mutateAsync,
    removeFromCart: deleteMutation.mutateAsync,
    isLoading: addMutation.isLoading || updateMutation.isLoading || deleteMutation.isLoading,
    error: addMutation.error || updateMutation.error || deleteMutation.error
  };
};