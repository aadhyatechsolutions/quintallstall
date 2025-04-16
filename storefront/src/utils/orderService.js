import axiosInstance from "./axiosInstance";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ API call to place an order
export const placeOrder = async (orderPayload) => {
  try {
    const { data } = await axiosInstance.post(
      "/place-order",
      orderPayload,
      getAuthHeader()
    );
    return data;  
  } 
  catch (error) {
    console.error("Failed to place order:", error);
    throw error;
  }
};
