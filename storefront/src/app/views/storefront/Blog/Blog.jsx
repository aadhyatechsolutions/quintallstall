import React from "react";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import BlogCard from "./BlogCard";

const blogPosts = [
  {
    title: "Why React is Still Relevant in 2025",
    excerpt:
      "Explore the continued dominance of React in modern frontend development and what's next for the framework. We dive deep into the latest features and community trends.",
    image: "https://source.unsplash.com/random/800x600?reactjs",
    date: "April 8, 2025",
  },
  {
    title: "Building Scalable Web Apps with Laravel",
    excerpt:
      "Laravel remains a go-to for robust backend development. Learn best practices for scaling with it, including database optimization and queue management techniques.",
    image: "https://source.unsplash.com/random/800x600?laravel",
    date: "April 4, 2025",
  },
  {
    title: "Tailwind CSS: Utility-First Styling Revolution",
    excerpt:
      "Discover how Tailwind CSS is reshaping the way developers write styles with speed and flexibility. See real-world examples of productivity gains and design consistency.",
    image: "https://source.unsplash.com/random/800x600?tailwindcss",
    date: "March 28, 2025",
  },
  {
    title: "Why React is Still Relevant in 2025",
    excerpt:
      "Explore the continued dominance of React in modern frontend development and what's next for the framework. We dive deep into the latest features and community trends.",
    image: "https://source.unsplash.com/random/800x600?reactjs",
    date: "April 8, 2025",
  },
  {
    title: "Building Scalable Web Apps with Laravel",
    excerpt:
      "Laravel remains a go-to for robust backend development. Learn best practices for scaling with it, including database optimization and queue management techniques.",
    image: "https://source.unsplash.com/random/800x600?laravel",
    date: "April 4, 2025",
  },
  {
    title: "Tailwind CSS: Utility-First Styling Revolution",
    excerpt:
      "Discover how Tailwind CSS is reshaping the way developers write styles with speed and flexibility. See real-world examples of productivity gains and design consistency.",
    image: "https://source.unsplash.com/random/800x600?tailwindcss",
    date: "March 28, 2025",
  },
];

function Blog() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={8}>
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          sx={{
            background:
              "linear-gradient(45deg, #b6131a 30%,rgb(232, 85, 83) 90%)",
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
        >
          Insights, tutorials, and tips from our development team. Stay updated
          with the latest trends in web development.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {blogPosts.map((post, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <BlogCard {...post} />
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={6}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: "50px",
            textTransform: "none",
            fontWeight: 600,
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
            },
          }}
        >
          View all articles
        </Button>
      </Box>
    </Container>
  );
}

export default Blog;
