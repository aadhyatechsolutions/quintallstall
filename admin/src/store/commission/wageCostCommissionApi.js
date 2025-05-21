import axiosInstance from "../../utils/axiosInstance";

// Fetch wage cost commission (only one record expected)
export const fetchWageCostCommission = async () => {
  const { data, status } = await axiosInstance.get('/wage-cost-commissions');
  if (status !== 200) {
    throw new Error('Failed to fetch wage cost commission');
  }
  return data;
};

// Add or update wage cost commission
export const addWageCostCommission = async (commissionData) => {
  try {
    const { data, status } = await axiosInstance.post('/wage-cost-commissions', commissionData);
    if (status !== 200 && status !== 201) {
      throw new Error('Failed to add wage cost commission');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add wage cost commission');
  }
};
