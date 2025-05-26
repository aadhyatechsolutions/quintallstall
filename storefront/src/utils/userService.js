import axiosInstance from "./axiosInstance";

// Helper to get Authorization header
const getAuthHeader = () => {
    const token = localStorage.getItem("accessToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  };
  
// ✅ NEW: Get logged-in user's profile
export const fetchCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/profile", getAuthHeader());
    return {
      success: true,
      data: response.data.user,
    };

  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch current user",
    };
  }
};

export const fetchUsersByRoles = async (roles = []) => {
  try {
    const roleParams = roles.map((role) => `roles[]=${role}`).join("&");
    const response = await axiosInstance.get(
      `/users?${roleParams}`,
        getAuthHeader()
    );
    return {
      success: true,
      data: response.data.users,
    };
    
  } 
  catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch users",
    };
  }
};
