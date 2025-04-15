// utils/authCartHandler.js
import { useCartStore } from "../store/cartStore"; // Add this import

export const handleAddToCartWithAuthCheck = async ({
  product,
  quantity = 1,
  replace = false,
}) => {
  const token = localStorage.getItem("accessToken") || '1|nI8V80JN8feEETkzdZjlT9qySr1mn3nBOTmCJj9k38c1a453';
  
  if (!token) {
    alert("Please login to add items to your cart.");
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/admin/session/signin`;
    return false;
  }

  try {
    // Get the current state from the store
    const { addToCart } = useCartStore.getState();
    
    // Call the addToCart function from the store
    await addToCart(product, quantity, replace);
    return true;
  } catch (error) {
    console.error("Cart operation failed:", error);
    alert("Failed to update cart. Please try again.");
    return false;
  }
};