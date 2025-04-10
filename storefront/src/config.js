export const apiConfig = {
  API_URL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000/api",
  MEDIA_URL:
    import.meta.env.VITE_BACKEND_MEDIA_URL || "http://localhost:8000/storage/",
};
