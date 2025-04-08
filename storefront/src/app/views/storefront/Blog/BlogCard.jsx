import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";

const BlogCard = ({ title, excerpt, image, date }) => {
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardActionArea>
        <CardMedia component="img" height="160" image={image} alt={title} />
        <CardContent>
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" mt={1}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
