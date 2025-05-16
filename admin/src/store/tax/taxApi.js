import axiosInstance from "../../utils/axiosInstance";

// ✅ Create a new tax
export const createTax = async ({ cgst, sgst, igst }) => {
  try {
    const { data } = await axiosInstance.post('/tax', { cgst, sgst, igst });
    return data.tax;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create tax');
  }
};

// ✅ Update an existing tax by ID
export const updateTax = async (id, { cgst, sgst, igst }) => {
  try {
    const { data } = await axiosInstance.put(`/tax/${id}`, { cgst, sgst, igst });
    return data.tax;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update tax');
  }
};

// ✅ Delete a tax by ID
export const deleteTax = async (id) => {
  try {
    await axiosInstance.delete(`/tax/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete tax');
  }
};

export const getAllTaxes = async () => {
  const { data, status } = await axiosInstance.get('/taxes');
    if (status !== 200) {
        throw new Error('Failed to fetch taxes');
    }
    return data.taxes;
};