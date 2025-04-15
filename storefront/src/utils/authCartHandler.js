import { useCartStore } from "../store/cartStore"; // Add this import

export const handleAddToCartWithAuthCheck = ({
  product,
  quantity,
  addToCart,
  replace = false,
}) => {
  // Access the cart from the Zustand store
  const cart = useCartStore.getState().cart.items;

  const itemInCart = cart.find((item) => item.product.id === product.id);

  if (itemInCart) {
    // If the product is already in the cart, either update the quantity or replace
    addToCart(product,quantity, replace);
  } else {
    // If the product is not in the cart, just add it with the given quantity
    addToCart(product, quantity, replace);
  }
};
