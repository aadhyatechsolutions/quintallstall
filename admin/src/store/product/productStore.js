import {create} from 'zustand';
import { fetchProducts, fetchProductsBySellerId, updateProduct, deleteProduct, addProduct, fetchProductsBySlug, fetchProductById, updateProductStatus } from './productApi'; 

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await fetchProducts();
      set({ products });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  addProduct: async(newProduct) => {
    try {
      const addedProduct = await addProduct(newProduct);
      set((state) => ({
        products: [...state.products, addedProduct],
      }));
      return addedProduct;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err; 
    }
    
  },

  updateProduct: async (productData, productId) => {
    set({ loading: true, error: null });
    try {
      const {product} = await updateProduct(productData, productId);
      set((state) => ({
        products: [...state.products, product],
      }));
      return product;
    } catch (err) {
        set({ error: err.message, loading: false });
      throw err; 
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: false, error: null });
    try {
      const deletedProduct = await deleteProduct(productId);
      set((state) => ({
        products: state.products.filter((product) => product.id !== productId)
      }));
      return deletedProduct;
    } catch (err) {
        set({ error: err.message, loading: false });
      throw err; 
    }
    
  },
  fetchProductsBySlug: async (slug) => {
    set({ loading: true, error: null });
    try {
      const products = await fetchProductsBySlug(slug);
      set({ products });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const product = await fetchProductById(id);  
      return product;
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
  updateProductStatus: async (productId, newStatus) => {
    set({ loading: false, error: null });
    try {
      const updatedProduct = await updateProductStatus(productId, newStatus);
      set((state) => ({
        products: state.products.map((p) =>
          p.id === productId ? updatedProduct : p
        ),
      }));
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  fetchProductsBySeller: async () => {
    set({ loading: true, error: null });
    try {
      const products = await fetchProductsBySellerId();
      set({ products });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProductStore;
