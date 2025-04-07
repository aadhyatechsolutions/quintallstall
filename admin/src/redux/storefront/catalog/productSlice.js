import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

const initialState = {
  products: [],
  loading: false,
  error: null,
  product: null, 
};

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  try {
    const { data } = await axiosInstance.get('/products');
    return data; 
  } catch (error) {
    throw new Error(error.response?.data || 'Failed to fetch products');
  }
});

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    try {
      const { data } = await axiosInstance.get(`/products/${id}`);
      return data; 
    } catch (error) {
      throw new Error(error.response?.data || 'Failed to fetch product');
    }
  }
);

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (productData) => {
    try {
      const { data } = await axiosInstance.post('/products', productData);
      return data; 
    } catch (error) {
      throw new Error(error.response?.data || 'Failed to add product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ id, productData }) => {
    try {
      const { data } = await axiosInstance.put(`/products/${id}`, productData);
      return data; 
    } catch (error) {
      throw new Error(error.response?.data || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      return id; 
    } catch (error) {
      throw new Error(error.response?.data || 'Failed to delete product');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {  
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); 
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProductIndex = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (updatedProductIndex !== -1) {
          state.products[updatedProductIndex] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setProduct, clearProduct } = productSlice.actions;

export default productSlice.reducer;
