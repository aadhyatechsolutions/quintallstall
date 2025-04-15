import axiosInstance from "../../utils/axiosInstance";

// Fetch all cart items for the current user
export const fetchCartItems = async () => {
  const { data, status } = await axiosInstance.get('/cart');
  if (status !== 200) {
    throw new Error('Failed to fetch cart items');
  }
  return data.cartItems;
};

// Add a new item to the cart
export const addToCart = async (itemData) => {
  try {
    const { data, status } = await axiosInstance.post('/cart', itemData);
    if (status !== 200) {
      throw new Error('Failed to add item to cart');
    }
    return data.cartItem;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add item to cart');
  }
};

// Update an existing cart item (e.g., quantity)
export const updateCartItem = async (itemId, updatedData) => {
  try {
    const { data } = await axiosInstance.put(`/cart/${itemId}`, updatedData);
    return data.cartItem;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update cart item');
  }
};

// Delete a specific cart item
export const deleteCartItem = async (itemId) => {
  try {
    const { data } = await axiosInstance.delete(`/cart/${itemId}`);
    return data.message || 'Cart item deleted';
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete cart item');
  }
};

// Clear entire cart
export const clearCart = async () => {
  try {
    const { data } = await axiosInstance.delete(`/cart`);
    return data.message || 'Cart cleared';
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to clear cart');
  }
};
