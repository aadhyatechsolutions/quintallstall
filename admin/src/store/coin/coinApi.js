import axiosInstance from "../../utils/axiosInstance"; // Assuming you have a custom Axios instance setup

export const fetchCoins = async () => {
  try {
    const { data, status } = await axiosInstance.get('/coins');
    if (status !== 200) {
      throw new Error('Failed to fetch coins');
    }
    return data.coins;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch coins');
  }
};

export const createCoin = async (coinData) => {
  try {
    const { data, status } = await axiosInstance.post('/coins', coinData);
    if (status !== 201) {
      throw new Error('Failed to create coin');
    }
    return data.coin;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create coin');
  }
};

export const updateCoin = async (coinData, coinId) => {
  try {
    const { data, status } = await axiosInstance.put(`/coins/${coinId}`, coinData);
    if (status !== 200) {
      throw new Error('Failed to update coin');
    }
    return data.coin;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update coin');
  }
};

export const deleteCoin = async (coinId) => {
  try {
    const { data, status } = await axiosInstance.delete(`/coins/${coinId}`);
    if (status !== 200) {
      throw new Error('Failed to delete coin');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete coin');
  }
};

export const fetchCoinById = async (id) => {
  try {
    const { data, status } = await axiosInstance.get(`/coins/${id}`);
    if (status !== 200) {
      throw new Error('Failed to fetch coin by ID');
    }
    return data.coin;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch coin by ID');
  }
};

export const fetchCoinsBySlug = async (slug) => {
  try {
    const { data, status } = await axiosInstance.get(`/coins/slug/${slug}`);
    if (status !== 200) {
      throw new Error('Failed to fetch coins by slug');
    }
    return data.coins;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch coins by slug');
  }
};
