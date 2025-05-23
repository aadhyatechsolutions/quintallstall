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

    const orderId = response.data?.order_id;

    if (orderId) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      return {
        success: false,
        // error: "Missing order_id in response",
        status: response.status,
      };
    }
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
