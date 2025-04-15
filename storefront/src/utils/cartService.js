// src/utils/cartService.js
import axiosInstance from "../utils/axiosInstance";

// Helper to get Authorization header
const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all cart items
export const fetchCartItems = async () => {
  const { data } = await axiosInstance.get("/cart", getAuthHeader());
  return data.cart;
};

// Add item to cart
export const addCartItem = async ({ product_id, quantity }) => {
  const { data } = await axiosInstance.post(
    "/cart/add",
    { product_id, quantity },
    getAuthHeader()
  );
  return data;
};

// Update cart item
export const updateCartItem = async ({ id, quantity }) => {
  const { data } = await axiosInstance.put(
    `/cart/item/${id}`,
    { quantity },
    getAuthHeader()
  );
  return data;
};

// Delete cart item
export const deleteCartItem = async (id) => {
    try {
      const { data } = await axiosInstance.delete(
        `/cart/items/${id}`,
        getAuthHeader()
      );
      return data;
    } catch (error) {
      // Enhance error information
      const errorDetails = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      };
      console.error('Delete cart item failed:', errorDetails);
      throw errorDetails; 
    }
  };
