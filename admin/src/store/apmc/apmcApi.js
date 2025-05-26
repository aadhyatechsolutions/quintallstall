import axiosInstance from "../../utils/axiosInstance";

// Fetch all APMCs
export const fetchApmcs = async () => {
  try {
    const { data } = await axiosInstance.get('/apmcs');
    return data.apmcs;
  } catch (error) {
    throw new Error('Failed to fetch APMCs');
  }
};

// Create a new APMC
export const createApmc = async (apmcData) => {
  try {
    const { data } = await axiosInstance.post('/apmcs', apmcData);
    return data.apmc;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create APMC');
  }
};

// Update an APMC by ID
export const updateApmc = async (apmcData, apmcId) => {
  try {
    const { data } = await axiosInstance.post(`/apmcs/${apmcId}`, apmcData);
    return data.apmc;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update APMC');
  }
};

// Delete an APMC by ID
export const deleteApmc = async (apmcId) => {
  try {
    const { data } = await axiosInstance.delete(`/apmcs/${apmcId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete APMC');
  }
};

export const fetchApmcById = async (id) => {
  const response = await axiosInstance.get(`/apmcs/${id}`);
  return response.data;
};

