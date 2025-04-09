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
