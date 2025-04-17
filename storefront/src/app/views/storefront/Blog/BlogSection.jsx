// /components/Blog/BlogSection.jsx

import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress
} from '@mui/material';
import BlogList from './BlogList';

const BlogSection = ({ posts }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const postContainerRef = useRef(null);

  const postsToShow = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 8);
      setLoading(false);

      // 👀 Auto-scroll to new content
      setTimeout(() => {
        postContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, 100);
    }, 800); // simulate loading delay
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={8}>
        <Typography
          variant="h3"
          fontWeight={800}
          gutterBottom
          sx={{
            background: "linear-gradient(to right, #e53935, #e35d5b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          From Our Blog
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          maxWidth="600px"
          mx="auto"
          mt={2}
        >
          Insights, tutorials, and development tips to help you stay ahead in the web world.
        </Typography>
      </Box>

      {/* 👇 ref to scroll to */}
      <Box ref={postContainerRef}>
        <BlogList posts={postsToShow} />
      </Box>

      <Box textAlign="center" mt={10}>
        {hasMore && (
          loading ? (
            <CircularProgress color="error" size={32} />
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={handleLoadMore}
              sx={{
                px: 6,
                py: 1.8,
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: '1rem',
                background: "linear-gradient(to right, #d32f2f, #f44336)",
                color: "#fff",
                boxShadow: 4,
                '&:hover': {
                  background: "linear-gradient(to right, #c62828, #ef5350)",
                  boxShadow: 6,
                  transform: 'translateY(-2px)'
                }
              }}
            >
              View more articles
            </Button>
          )
        )}
      </Box>
    </Container>
  );
};

export default BlogSection;
