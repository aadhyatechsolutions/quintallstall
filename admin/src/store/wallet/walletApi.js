import axiosInstance from "../../utils/axiosInstance";

export const fetchWallets = async () => {
  try {
    const { data } = await axiosInstance.get('/wallets');
    return data.wallets;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch wallets');
  }
};


export const updateWallet = async (walletData, walletId) => {
  try {
    const { data } = await axiosInstance.put(`/wallets/${walletId}`, walletData);
    return data.wallet;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update wallet');
  }
};

export const deleteWallet = async (walletId) => {
  try {
    await axiosInstance.delete(`/wallets/${walletId}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete wallet');
  }
};

export const fetchWalletById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/wallets/${id}`);
    return data.wallet;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch wallet by ID');
  }
};
