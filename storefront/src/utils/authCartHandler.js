// utils/authCartHandler.js
export const handleAddToCartWithAuthCheck = ({
    product,
    quantity = 1,
    addToCart,
    replace = false,
  }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login to add items to your cart.");
      const baseUrl = window.location.origin;
      window.location.href = `${baseUrl}/admin/session/signin`;
      return;
    }
  
    addToCart(product, quantity, replace);
  };
  