import axiosInstance from "../../utils/axiosInstance";

export const fetchRoles = async () => {
  try {
    const response = await axiosInstance.get('/roles');  
    return response.data;  
  } catch (error) {
    throw new Error("Failed to fetch roles: " + error.message);
  }
};

export const createRole = async (roleData) => {
  try {
    const response = await axiosInstance.post('/roles', roleData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create role: " + error.message);
  }
};

export const fetchRoleById = async (id) => {
  try {
    const response = await axiosInstance.get(`/roles/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch role by ID: " + error.message);
  }
};

export const updateRole = async (id, roleData) => {
  try {
    const response = await axiosInstance.put(`/roles/${id}`, roleData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await axiosInstance.delete(`/roles/${id}`);
    return response.data; // Assuming the API returns some response after deleting
  } catch (error) {
    throw new Error("Failed to delete role: " + error.message);
  }
};