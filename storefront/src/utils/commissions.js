// utils/commissions.js
import axiosInstance from "./axiosInstance";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export const fetchPlatformCommission = async () => {
  const { data } = await axiosInstance.get("/platform-commissions", getAuthHeader());
  return parseFloat(data.platform_price);
};

export const fetchWageCostCommission = async () => {
  const { data } = await axiosInstance.get("/wage-cost-commissions", getAuthHeader());
  return {
    cost: parseFloat(data.cost),
    commission: parseFloat(data.commission),
  };
};

export const fetchTaxes = async () => {
  const { data } = await axiosInstance.get("/taxes", getAuthHeader());
  return data.taxes[0] || { cgst: 0, sgst: 0, igst: 0 };
};
