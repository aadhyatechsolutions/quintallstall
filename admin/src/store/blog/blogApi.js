import axiosInstance from "../../utils/axiosInstance";

export const fetchBlogs = async () => {
  const { data, status } = await axiosInstance.get('/blogs');
  if (status !== 200) {
    throw new Error('Failed to fetch blogs');
  }
  return data;
};

export const fetchBlogById = async (id) => {
  try {
    const { data, status } = await axiosInstance.get(`/blogs/${id}`);
    if (status !== 200) {
      throw new Error('Failed to fetch blog by ID');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch blog by ID');
  }
};

export const createBlog = async (blogData) => {
  try {
    const { data, status } = await axiosInstance.post('/blogs', blogData);
    if (status !== 200 && status !== 201) {
      throw new Error('Failed to create blog');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create blog');
  }
};

export const updateBlog = async (blogId, blogData) => {
  try {
    const { data, status } = await axiosInstance.put(`/blogs/${blogId}`, blogData);
    if (status !== 200) {
      throw new Error('Failed to update blog');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update blog');
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const { data, status } = await axiosInstance.delete(`/blogs/${blogId}`);
    if (status !== 200) {
      throw new Error('Failed to delete blog');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete blog');
  }
};
