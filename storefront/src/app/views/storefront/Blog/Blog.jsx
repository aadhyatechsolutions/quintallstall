import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import BlogCard from "./BlogCard";

const blogPosts = [
  {
    title: "Why React is Still Relevant in 2025",
    excerpt:
      "Explore the continued dominance of React in modern frontend development and what's next for the framework.",
    image: "https://source.unsplash.com/random/800x600?reactjs",
    date: "April 8, 2025",
  },
  {
    title: "Building Scalable Web Apps with Laravel",
    excerpt:
      "Laravel remains a go-to for robust backend development. Learn best practices for scaling with it.",
    image: "https://source.unsplash.com/random/800x600?laravel",
    date: "April 4, 2025",
  },
  {
    title: "Tailwind CSS: Utility-First Styling Revolution",
    excerpt:
      "Discover how Tailwind CSS is reshaping the way developers write styles with speed and flexibility.",
    image: "https://source.unsplash.com/random/800x600?tailwindcss",
    date: "March 28, 2025",
  },
];

function Blog() {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          From Our Blog
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Insights, tutorials, and tips from our development team.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {blogPosts.map((post, index) => (
          <Grid key={index} sx={{ display: "flex" }}>
            <BlogCard {...post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Blog;
