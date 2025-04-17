import React, { useEffect } from "react";
import { useBlogStore } from "../../../../store/blogStore";
import BlogSection from "./BlogSection";

const BlogPage = () => {
  const { blogs, blogStatus, blogError, fetchBlogs } = useBlogStore();

  useEffect(() => {
    if (blogs.length === 0 && blogStatus !== "loading") {
      fetchBlogs();
    }
  }, [blogs, blogStatus, fetchBlogs]);

  if (blogStatus === "loading") return <p>Loading...</p>;
  if (blogStatus === "error") return <p>Error: {blogError}</p>;

  return <BlogSection posts={blogs} />;
};

export default BlogPage;
