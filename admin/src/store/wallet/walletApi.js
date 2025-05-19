import axiosInstance from "../../utils/axiosInstance";

// ✅ Fetch the current user's wallet
export const fetchWallet = async () => {
  try {
    const { data } = await axiosInstance.get('/wallet');
    return data.wallet;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch wallet');
  }
};


// ✅ Delete a wallet
export const deleteWallet = async (walletId) => {
  try {
    await axiosInstance.delete(`/wallet/${walletId}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete wallet');
  }
};

export const addAmount = async ({amount }) => {
  try {
    const { data } = await axiosInstance.post('/wallet/add-amount', {
      amount,
    });
    return data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add coin to wallet');
  }
};

export const updateWallet = async (status) => {
  try {
    const response = await axiosInstance.put(`/wallet`, { status });
    return response.data.wallet;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update wallet');
  }
};
