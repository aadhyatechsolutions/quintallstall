import React from 'react';
import { blogPosts } from './blogData';
import BlogSection from './BlogSection';

const BlogPage = () => {
  return <BlogSection posts={blogPosts} />;
};

export default BlogPage;
