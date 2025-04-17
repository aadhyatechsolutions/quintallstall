import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getBlogs } from "../utils/blogService";

export const useBlogStore = create(
  persist(
    (set, get) => ({
      blogs: [],
      blogStatus: "idle", // 'idle' | 'loading' | 'success' | 'error'
      blogError: null,

      fetchBlogs: async () => {
        set({ blogStatus: "loading", blogError: null });

        const result = await getBlogs();

        if (result.success) {
          set({
            blogs: result.data,
            blogStatus: "success",
            blogError: null,
          });
        } else {
          set({
            blogStatus: "error",
            blogError: result.error,
          });
        }
      },

      resetBlogs: () => {
        set({
          blogs: [],
          blogStatus: "idle",
          blogError: null,
        });
      },
    }),
    {
      name: "blog-storage",
    }
  )
);
