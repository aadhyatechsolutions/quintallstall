import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

/** Fetch all products */
const fetchProducts = async () => {
  const { data } = await axiosInstance.get("/products");
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
  const { data } = await axiosInstance.get(`/products/${id}`);
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
