import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 360,
  height: '100%',
  margin: '0 auto',
  borderRadius: '16px',
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: theme.shadows[10],
  },
}));

const BlogCard = ({ id, title, excerpt, image, date, author }) => {
  return (
    <StyledCard>
      {/* Image - Clickable */}
      <Link to={`/blog/${id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          image={image}
          alt={`Cover image for ${title}`}
          sx={{
            height: 200,
            width: '100%',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            objectFit: 'cover',
            cursor: 'pointer',
          }}
        />
      </Link>

      <CardContent sx={{ px: 3, py: 3, width: '100%' }}>
        <Box display="flex" alignItems="center" mb={1.5}>
          <Avatar
            sx={{
              width: 28,
              height: 28,
              mr: 1.2,
              bgcolor: 'primary.main',
              fontSize: '0.8rem',
            }}
          >
            {author.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
        </Box>

        {/* Title - Clickable */}
        <Link to={`/blog/${id}`} style={{ textDecoration: 'none' }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '3.2rem',
              color: 'text.primary',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {title}
          </Typography>
        </Link>

        {/* Excerpt - NOT clickable */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '4.2rem',
          }}
        >
          {excerpt}
        </Typography>

        {/* Read More Button - Clickable */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button
            variant="text"
            size="small"
            component={Link}
            to={`/blog/${id}`}
            sx={{
              fontWeight: 600,
              textTransform: 'none',
              color: 'primary.main',
              px: 0,
              '&:hover': {
                textDecoration: 'underline',
                color:'#d32f2f'
              },
            }}
          >
            Read More →
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default BlogCard;
