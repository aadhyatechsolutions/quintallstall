import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { useBlogStore } from "../../../../store/blogStore";
import { apiConfig } from "../../../../config";

const BlogPostDetail = () => {
  const { id } = useParams();
  const { blogs, blogStatus, blogError, fetchBlogs } = useBlogStore();

  useEffect(() => {
    if (blogs.length === 0) {
      fetchBlogs();
    }
  }, []);

  const post = blogs.find((p) => p.id === parseInt(id));

  if (blogStatus === "loading") return <Typography>Loading...</Typography>;
  if (blogStatus === "error") return <Typography>Error: {blogError}</Typography>;
  if (!post) return <Typography>Post not found</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {new Date(post.date).toLocaleDateString()} — by {post.author}
      </Typography>
      <Box
        component="img"
        src={`${apiConfig.MEDIA_URL}${post.image}`}
        alt={post.title}
        sx={{ width: "100%", borderRadius: 2, my: 4 }}
      />
      <Typography paragraph>{post.content?.introduction}</Typography>
      <ul>
        {post.content?.features?.map((feature, i) => (
          <li key={i}>
            <Typography>{feature}</Typography>
          </li>
        ))}
      </ul>
      <Typography paragraph>{post.content?.conclusion}</Typography>
    </Container>
  );
};

export default BlogPostDetail;
