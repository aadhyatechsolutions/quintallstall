// src/utils/cartService.js

import axiosInstance from "../utils/axiosInstance";

// Fetch all cart items
export const fetchCartItems = async () => {
  const { data } = await axiosInstance.get("/cart");
  return data.cart; // Modify according to your API response
};

// Add item to cart
export const addCartItem = async ({ product_id, quantity }) => {
    const token = localStorage.getItem("accessToken");
  const { data } = await axiosInstance.post("/cart/add", {
    product_id,
    quantity,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data; // Modify based on the response you get
};

// Update cart item
export const updateCartItem = async ({ id, quantity }) => {
  const { data } = await axiosInstance.put(`/cart/item/${id}`, {
    quantity,
  });
  return data;
};

// Delete cart item
export const deleteCartItem = async (id) => {
  const { data } = await axiosInstance.delete(`/cart/item/${id}`);
  return data;
};
