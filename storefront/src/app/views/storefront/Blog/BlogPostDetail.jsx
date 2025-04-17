// /BlogPostDetail.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts } from './blogData';
import { Container, Typography, Box } from '@mui/material';

const BlogPostDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) return <Typography>Post not found</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>{post.title}</Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {post.date} — by {post.author}
      </Typography>
      <Box component="img" src={post.image} alt={post.title} sx={{ width: '100%', borderRadius: 2, my: 4 }} />
      <Typography paragraph>{post.content.introduction}</Typography>
      <ul>
        {post.content.features.map((feature, i) => (
          <li key={i}><Typography>{feature}</Typography></li>
        ))}
      </ul>
      <Typography paragraph>{post.content.conclusion}</Typography>
    </Container>
  );
};

export default BlogPostDetail;
