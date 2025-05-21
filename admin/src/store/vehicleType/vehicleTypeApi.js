import axiosInstance from "../../utils/axiosInstance";

// Fetch all vehicle types
export const fetchVehicleTypes = async () => {
  const { data, status } = await axiosInstance.get('/vehicle-types');
  if (status !== 200) {
    throw new Error('Failed to fetch vehicle types');
  }
  return data;
};

// Add a new vehicle type
export const addVehicleType = async (vehicleTypeData) => {
  try {
    const { data, status } = await axiosInstance.post('/vehicle-types', vehicleTypeData);
    if (status !== 200 && status !== 201) {
      throw new Error('Failed to add vehicle type');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add vehicle type');
  }
};

// Update a vehicle type
export const updateVehicleType = async (vehicleTypeData, vehicleTypeId) => {
  try {
    const { data, status } = await axiosInstance.put(`/vehicle-types/${vehicleTypeId}`, vehicleTypeData);
    if (status !== 200) {
      throw new Error('Failed to update vehicle type');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update vehicle type');
  }
};

// Delete a vehicle type
export const deleteVehicleType = async (vehicleTypeId) => {
  try {
    const { data, status } = await axiosInstance.delete(`/vehicle-types/${vehicleTypeId}`);
    if (status !== 200) {
      throw new Error('Failed to delete vehicle type');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete vehicle type');
  }
};

// Fetch a vehicle type by ID
export const fetchVehicleTypeById = async (id) => {
  try {
    const { data, status } = await axiosInstance.get(`/vehicle-types/${id}`);
    if (status !== 200) {
      throw new Error('Failed to fetch vehicle type by ID');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch vehicle type by ID');
  }
};
