import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

/** Fetch all Categories */
const fetchCategories = async () => {
  const { data } = await axiosInstance.get("/categories");
  return data.categories;
};

/** Hook to get all Categories */
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};

/** Fetch a single Categorie by ID */
const fetchCategoriesById = async ({ queryKey }) => {
  const [, id] = queryKey;
  const { data } = await axiosInstance.get(`categories/${id}`);
  return data.categories;
};

/** Hook to get a Categorie by ID */
export const useCategorie = (id) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: fetchCategoriesById,
    enabled: !!id,
  });
};
