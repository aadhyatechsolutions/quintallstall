import axiosInstance from "./axiosInstance";

export const getBlogs = async () => {
  try {
    const response = await axiosInstance.get("/blogs");
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch blogs",
      status: error.response?.status,
    };
  }
};
