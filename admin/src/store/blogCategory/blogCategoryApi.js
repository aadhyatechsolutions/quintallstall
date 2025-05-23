import axiosInstance from "../../utils/axiosInstance";

// Fetch all blog categories
export const fetchBlogCategories = async () => {
  const { data, status } = await axiosInstance.get('/blog-categories');
  if (status !== 200) {
    throw new Error('Failed to fetch blog categories');
  }
  return data.blogCategories;
};

// Create a new blog category
export const createBlogCategory = async (categoryData) => {
  try {
    const { data, status } = await axiosInstance.post('/blog-categories', categoryData);
    if (status !== 201 && status !== 200) {
      throw new Error('Failed to create blog category');
    }
    return data.blogCategory;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create blog category');
  }
};

// Fetch blog category by ID
export const fetchBlogCategoryById = async (id) => {
  try {
    const { data, status } = await axiosInstance.get(`/blog-categories/${id}`);
    if (status !== 200) {
      throw new Error('Failed to fetch blog category');
    }
    return data.blogCategory;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch blog category');
  }
};

// Update blog category
export const updateBlogCategory = async (id, updatedData) => {
  try {
    const { data, status } = await axiosInstance.put(`/blog-categories/${id}`, updatedData);
    if (status !== 200) {
      throw new Error('Failed to update blog category');
    }
    return data.blogCategory;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update blog category');
  }
};

// Delete blog category
export const deleteBlogCategory = async (id) => {
  try {
    const { data, status } = await axiosInstance.delete(`/blog-categories/${id}`);
    if (status !== 200) {
      throw new Error('Failed to delete blog category');
    }
    return data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete blog category');
  }
};
