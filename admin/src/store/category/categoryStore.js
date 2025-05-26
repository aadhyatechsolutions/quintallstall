import { create } from 'zustand';
import { fetchCategories, updateCategory, deleteCategory, createCategory, fetchCategoryById } from './categoryApi';

const useCategoryStore = create((set) => ({
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const categories = await fetchCategories();
      set({ categories });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },


  addCategory: async (newCategory) => {
    try {
      const category = await createCategory(newCategory);
      set((state) => ({
        categories: [...state.categories, category],
      }));
      return category;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  updateCategory: async (categoryData, categoryId) => {
    set({ loading: true, error: null });
    try {
      const category = await updateCategory(categoryData, categoryId);
      set((state) => ({
        categories: state.categories.map((category) => category.id !== categoryId),
      }));
      return category;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  deleteCategory: async (categoryId) => {
    set({ loading: false, error: null });
    try {
      const deletedCategory = await deleteCategory(categoryId);
      set((state) => ({
        categories: state.categories.filter((category) => category.id !== categoryId),
      }));
      return deletedCategory;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
  fetchCategoryById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCategoryById(id);
      set({ currentCategory: data.category });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategoryStore;
