import axiosInstance from "../../utils/axiosInstance";

// Fetch all platform commissions
export const fetchPlatformCommission = async () => {
  const { data, status } = await axiosInstance.get('/platform-commissions');
  if (status !== 200) {
    throw new Error('Failed to fetch platform commissions');
  }
  return data;
};

export const addPlatformCommission = async (commissionData) => {
  try {
    const { data, status } = await axiosInstance.post('/platform-commissions', commissionData);
    if (status !== 200 && status !== 201) {
      throw new Error('Failed to add platform commission');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add platform commission');
  }
};

