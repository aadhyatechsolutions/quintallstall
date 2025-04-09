import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

/** Fetch all products */
const fetchProducts = async () => {
  const { data } = await axios.get(BASE_URL);
  return data.products;
};

/** Hook to get all products */
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

/** Fetch a single product by ID */
const fetchProductById = async ({ queryKey }) => {
  const [, id] = queryKey;
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data.product;
};

/** Hook to get a product by ID */
export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: fetchProductById,
    enabled: !!id,
  });
};
