// hooks/contactHooks.js
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: (formData) => axiosInstance.post("/contact-us", formData),
  });
};
