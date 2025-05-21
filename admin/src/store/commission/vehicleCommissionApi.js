import axiosInstance from "../../utils/axiosInstance";

// Fetch all vehicle commissions
export const fetchVehicleCommissions = async () => {
  const { data, status } = await axiosInstance.get('/vehicle-commissions');
  if (status !== 200) {
    throw new Error('Failed to fetch vehicle commissions');
  }
  return data;
};

// Add a new vehicle commission
export const addVehicleCommission = async (commissionData) => {
  try {
    const { data, status } = await axiosInstance.post('/vehicle-commissions', commissionData);
    if (status !== 200 && status !== 201) {
      throw new Error('Failed to add vehicle commission');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add vehicle commission');
  }
};

// Update a vehicle commission
export const updateVehicleCommission = async (commissionData, commissionId) => {
  try {
    const { data, status } = await axiosInstance.put(`/vehicle-commissions/${commissionId}`, commissionData);
    if (status !== 200) {
      throw new Error('Failed to update vehicle commission');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update vehicle commission');
  }
};

// Delete a vehicle commission
export const deleteVehicleCommission = async (commissionId) => {
  try {
    const { data, status } = await axiosInstance.delete(`/vehicle-commissions/${commissionId}`);
    if (status !== 200) {
      throw new Error('Failed to delete vehicle commission');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete vehicle commission');
  }
};

// Fetch a vehicle commission by ID
export const fetchVehicleCommissionById = async (id) => {
  try {
    const { data, status } = await axiosInstance.get(`/vehicle-commissions/${id}`);
    if (status !== 200) {
      throw new Error('Failed to fetch vehicle commission by ID');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch vehicle commission by ID');
  }
};
