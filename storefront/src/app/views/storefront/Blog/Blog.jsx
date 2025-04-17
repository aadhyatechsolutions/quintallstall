import React from "react";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import BlogCard from "./BlogCard";
import { blogPosts } from "./blogData";

function Blog() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }} component="section" aria-label="Blog posts">
      <Box textAlign="center" mb={8}>
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          sx={{
            background: "linear-gradient(45deg, #b6131a 30%, rgb(232, 85, 83) 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
        >
          From Our Blog
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          maxWidth="md"
          mx="auto"
          mt={2}
        >
          Insights, tutorials, and tips from our development team. Stay updated
          with the latest trends in web development.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {blogPosts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4} lg={4}>
            <BlogCard {...post} />
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={8}>
        <Button
          variant="contained"
          size="large"
          component="a"
          href="/blog"
          sx={{
            px: 6,
            py: 1.5,
            borderRadius: "50px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: '1rem',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 4,
            }
          }}
        >
          View all articles
        </Button>
      </Box>
    </Container>
  );
}

export default Blog;