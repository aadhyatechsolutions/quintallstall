import axiosInstance from "../../utils/axiosInstance"; // Custom Axios instance

// Fetch all purchase coins
export const fetchAllPurchaseCoins = async () => {
  try {
    const { data, status } = await axiosInstance.get('/purchase-coins');
    if (status !== 200) {
      throw new Error('Failed to fetch purchase coins');
    }
    return data.purchaseCoins;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch purchase coins');
  }
};

// Add a new purchase coin
export const addPurchaseCoin = async (coinData) => {
  try {
    const { data, status } = await axiosInstance.post('/purchase-coins', coinData);
    if (status !== 201) {
      throw new Error('Failed to add purchase coin');
    }
    return data.purchaseCoin;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add purchase coin');
  }
};
