import axiosInstance from "./axiosInstance";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export const fetchWishlistItems = async () => {
  try {
    const { data } = await axiosInstance.get("/wishlists", getAuthHeader());
    // API returns: { data: [...] }
    return { items: data.data || [] };
  } catch (error) {
    console.error("Failed to fetch wishlist:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch wishlist"
    );
  }
};

export const addWishlistItem = async ({ product_id }) => {
  try {
    const { data } = await axiosInstance.post(
      "/wishlists",
      { product_id },
      getAuthHeader()
    );
    return {
      success: true,
      item: data.wishlist_item || data.item || data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to add to wishlist",
    };
  }
};

export const deleteWishlistItem = async (id) => {
  try {
    const { data } = await axiosInstance.delete(
      `/wishlists/${id}`,
      getAuthHeader()
    );
    return { success: true, message: data.message };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to delete from wishlist",
    };
  }
};
