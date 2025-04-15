import axiosInstance from "../../utils/axiosInstance";

// Fetch all orders
export const fetchOrders = async () => {
  try {
    const { data, status } = await axiosInstance.get('/orders');
    if (status !== 200) {
      throw new Error('Failed to fetch orders');
    }
    return data.orders;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch orders');
  }
};

// Fetch an order by its ID
export const fetchOrderById = async (id) => {
  try {
    const { data, status } = await axiosInstance.get(`/orders/${id}`);
    if (status !== 200) {
      throw new Error('Failed to fetch order');
    }
    return data.order;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch order');
  }
};

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const { data, status } = await axiosInstance.post('/orders', orderData);
    if (status !== 200 && status !== 201) {
      throw new Error('Failed to create order');
    }
    return data.order;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create order');
  }
};

// Update an order's status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const { data, status: responseStatus } = await axiosInstance.put(
      `/orders/${orderId}/status`,
      { status }
    );
    if (responseStatus !== 200) {
      throw new Error('Failed to update order status');
    }
    return data.order;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update order status');
  }
};

// Delete an order
export const deleteOrder = async (orderId) => {
  try {
    const { data, status } = await axiosInstance.delete(`/orders/${orderId}`);
    if (status !== 200) {
      throw new Error('Failed to delete order');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete order');
  }
};
