import axiosInstance from "../../utils/axiosInstance";

export const fetchProducts = async () => {
    const { data, status } = await axiosInstance.get('/products');
    if (!(status == 200)) {
      throw new Error('Failed to fetch products');
    }
    return data.products
  };
  
  export const createProduct = async (productData) => {
    const { data, status } = await axiosInstance.post('/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!(status == 200)) {
      throw new Error('Failed to create product');
    }
    return data
  };
  export const updateProduct = async (productData, productId) => {
    try {
  
      const { data } = await axiosInstance.post(
        `/products/${productId}`,
        productData,
      );
  
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update product');
    }
  };
  export const deleteProduct = async (productId) => {
    try {
      const { data } = await axiosInstance.delete(
        `/products/${productId}`
      );
  
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete product');
    }
  };
  export const addProduct = async (newProduct) => {
    try {
      const { data } = await axiosInstance.post(
        `/products`,
        newProduct
      );
      return data.product;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete product');
    }
  };
  export const fetchProductsBySlug = async (slug) => {
    try {
      const { data, status } = await axiosInstance.get(`/products/role/${slug}`);
      if (status !== 200) {
        throw new Error('Failed to fetch products by slug');
      }
      return data.products;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products by slug');
    }
  };
  export const fetchProductById = async (id) => {
    try {
      const { data, status } = await axiosInstance.get(`/products/${id}`);
      if (status !== 200) {
        throw new Error('Failed to fetch products by id');
      }
      return data.product;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products by id');
    }
  };
  export const updateProductStatus = async (productId, newStatus) => {
    try {
      const { data, status } = await axiosInstance.post(`/products/${productId}/status`, {
        status: newStatus,
        _method: 'put',
      });
  
      if (status !== 200) {
        throw new Error('Failed to update product status');
      }
  
      return data.product;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update product status');
    }
  };

  export const fetchProductsBySellerId = async () => {
    const { data, status } = await axiosInstance.get('/products/seller');
    if (status !== 200) {
      throw new Error('Failed to fetch seller products');
    }
    return data.products;
  };
  
  