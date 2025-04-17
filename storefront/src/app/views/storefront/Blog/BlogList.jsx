// /components/Blog/BlogList.jsx

import React from 'react';
import { Grid } from '@mui/material';
import BlogCard from './BlogCard';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const BlogList = ({ posts }) => {
  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {posts.map((post) => (
        <Grid size={{ xs:12,sm:6,md:4,lg:4}}
       
          key={post.id}
          
          component={motion.div}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <BlogCard {...post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogList;
