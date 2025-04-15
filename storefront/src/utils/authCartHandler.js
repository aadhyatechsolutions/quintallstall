import { useCartStore } from "../store/cartStore";

export const handleAddToCartWithAuthCheck = ({
  product,
  quantity,
  addToCart,
  replace = false,
}) => {
  const cart = useCartStore.getState().cart;
  const token = localStorage.getItem("accessToken");
  
  if (!token) {
    alert("Please login to add items to your cart.");
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/admin/session/signin`;
    return false;
  }

  const itemInCart = cart.items?.find((item) => item.product.id === product.id);

  if (itemInCart) {
    // If the product is already in the cart, either update the quantity or replace
    addToCart(product,quantity, replace);
  } else {
    // If the product is not in the cart, just add it with the given quantity
    addToCart(product, quantity, replace);
  }
};
