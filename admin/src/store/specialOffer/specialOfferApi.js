import axiosInstance from "../../utils/axiosInstance";

// Fetch all special offers (public route)
export const fetchSpecialOffers = async () => {
  const { data, status } = await axiosInstance.get('/special-offers');
  if (status !== 200) {
    throw new Error('Failed to fetch special offers');
  }
  return data;
};

// Fetch special offer by ID
export const fetchSpecialOfferById = async (id) => {
  try {
    const { data, status } = await axiosInstance.get(`/special-offers/${id}`);
    if (status !== 200) {
      throw new Error('Failed to fetch special offer by ID');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch special offer by ID');
  }
};

// Create a new special offer (requires login)
export const createSpecialOffer = async (offerData) => {
  try {
    const { data, status } = await axiosInstance.post('/special-offers', offerData);
    if (status !== 200 && status !== 201) {
      throw new Error('Failed to create special offer');
    }
    return data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create special offer');
  }
};

// Update a special offer (requires login)
export const updateSpecialOffer = async (offerData, offerId) => {
  try {
    const { data, status } = await axiosInstance.post(`/special-offers/${offerId}`, offerData);

    if (status !== 200) {
      throw new Error('Failed to update special offer');
    }

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update special offer');
  }
};

// Delete a special offer (requires login)
export const deleteSpecialOffer = async (offerId) => {
  try {
    const { data, status } = await axiosInstance.delete(`/special-offers/${offerId}`);
    if (status !== 200) {
      throw new Error('Failed to delete special offer');
    }
    return data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete special offer');
  }
};
