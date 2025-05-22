// hooks/useSpecialOffers.js
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

const fetchSpecialOffers = async () => {
  const { data } = await axiosInstance.get("/special-offers");
  return data;
};

export const useSpecialOffers = () => {
  return useQuery({
    queryKey: ["specialOffers"],
    queryFn: fetchSpecialOffers,
    staleTime: Infinity, // never considered stale
    cacheTime: Infinity, // stay in cache until app is closed
    refetchOnWindowFocus: false, // do not refetch when switching tabs
    refetchOnMount: false, // do not refetch when remounting the component
    refetchOnReconnect: false,
  });
};
