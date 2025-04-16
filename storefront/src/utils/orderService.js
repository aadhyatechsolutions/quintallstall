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

export const placeOrder = async (orderPayload) => {
  try {
    const response = await axiosInstance.post(
      "/place-order",
      orderPayload,
      getAuthHeader()
    );
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } 
  catch (error) {
    console.error("Failed to place order:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to place order",
      status: error.response?.status,
    };
  }
};