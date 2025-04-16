import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

/** Fetch all APMCs */
const fetchApmcs = async () => {
  const { data } = await axiosInstance.get("/apmcs");
  return data.apmcs;
};

/** Hook to get all APMCs */
export const useApmcs = () => {
  return useQuery({
    queryKey: ["apmcs"],
    queryFn: fetchApmcs,
  });
};

