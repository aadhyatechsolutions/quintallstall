// categoryApi.js
import axiosInstance from "../../utils/axiosInstance";

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const { data } = await axiosInstance.get('/categories');
    return data.categories;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const { data } = await axiosInstance.post('/categories', categoryData);
    return data.category;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create category');
  }
};

// Update a category by ID
export const updateCategory = async (categoryData, categoryId) => {
  try {
    const { data } = await axiosInstance.post(`/categories/${categoryId}`, categoryData);
    return data.category;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update category');
  }
};

// Delete a category by ID
export const deleteCategory = async (categoryId) => {
  try {
    const { data } = await axiosInstance.delete(`/categories/${categoryId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete category');
  }
};

export const fetchCategoryById = async (id) => {
  const response = await axiosInstance.get(`/categories/${id}/`);
  return response.data;
};
