import { useCartStore } from "../store/cartStore"; // Add this import

export const handleAddToCartWithAuthCheck = ({
  product,
  quantity,
  addToCart,
  replace = false,
}) => {
<<<<<<< HEAD
  // Access the cart from the Zustand store
  const cart = useCartStore.getState().cart.items;
=======
  const token = localStorage.getItem("accessToken") || '1|nI8V80JN8feEETkzdZjlT9qySr1mn3nBOTmCJj9k38c1a453';
  
  if (!token) {
    alert("Please login to add items to your cart.");
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/admin/session/signin`;
    return false;
  }
>>>>>>> 7f3099552e8e71105ad22694576f348bdaf8fb82

  const itemInCart = cart.find((item) => item.product.id === product.id);

  if (itemInCart) {
    // If the product is already in the cart, either update the quantity or replace
    addToCart(product,quantity, replace);
  } else {
    // If the product is not in the cart, just add it with the given quantity
    addToCart(product, quantity, replace);
  }
};
