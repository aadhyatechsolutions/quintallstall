import axiosInstance from "../../utils/axiosInstance";

export const fetchSessions = async () => {
  try {
    const response = await axiosInstance.get('sessions');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch sessions');
  }
};

export const logoutSession = async (tokenId) => {
  try {
    const response = await axiosInstance.delete(`sessions/${tokenId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to logout from session');
  }
};
