import axiosInstance from "../../utils/axiosInstance";

export const getVehicleTypes = async () => {
  const response = await axiosInstance.get("/vehicle/types");
  return response.data;
};
