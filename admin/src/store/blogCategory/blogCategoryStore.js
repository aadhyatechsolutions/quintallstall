import { create } from 'zustand';
import {
  fetchBlogCategories,
  createBlogCategory,
  fetchBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
} from './blogCategoryApi';

const useBlogCategoryStore = create((set) => ({
  blogCategories: [],
  loading: false,
  error: null,
  currentCategory: null,

  fetchBlogCategories: async () => {
    set({ loading: true, error: null });
    try {
      const categories = await fetchBlogCategories();
      set({ blogCategories: categories });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  createBlogCategory: async (categoryData) => {
    set({ loading: true, error: null });
    try {
      const newCategory = await createBlogCategory(categoryData);
      set((state) => ({
        blogCategories: [...state.blogCategories, newCategory],
      }));
      return newCategory;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  fetchBlogCategoryById: async (id) => {
    set({ loading: true, error: null });
    try {
      const category = await fetchBlogCategoryById(id);
      set({ currentCategory: category });
      return category;
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  updateBlogCategory: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const updatedCategory = await updateBlogCategory(id, updatedData);
      set((state) => ({
        blogCategories: state.blogCategories.map((cat) =>
          cat.id === id ? updatedCategory : cat
        ),
      }));
      return updatedCategory;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteBlogCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteBlogCategory(id);
      set((state) => ({
        blogCategories: state.blogCategories.filter((cat) => cat.id !== id),
      }));
      return response;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useBlogCategoryStore;
