import { create } from 'zustand';
import {
  fetchBlogs,
  fetchBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} from './blogApi'; 

const useBlogStore = create((set) => ({
  blogs: [],
  loading: false,
  error: null,
  currentBlog: null,

  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const blogs = await fetchBlogs();
      set({ blogs });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchBlogById: async (id) => {
    set({ loading: true, error: null });
    try {
      const blog = await fetchBlogById(id);
      set({ currentBlog: blog });
      return blog;
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  createBlog: async (newBlog) => {
    set({ loading: true, error: null });
    try {
      const blog = await createBlog(newBlog);
      set((state) => ({
        blogs: [...state.blogs, blog]
      }));
      return blog;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateBlog: async (id, blogData) => {
    set({ loading: true, error: null });
    try {
      const updatedBlog = await updateBlog(id, blogData);
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === id ? updatedBlog : blog
        )
      }));
      return updatedBlog;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteBlog: async (id) => {
    set({ loading: true, error: null });
    try {
      const result = await deleteBlog(id);
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== id)
      }));
      return result;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  }
}));

export default useBlogStore;
