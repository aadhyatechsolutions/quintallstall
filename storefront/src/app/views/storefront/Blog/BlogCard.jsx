import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  height: "100%",
  borderRadius: "12px",
  boxShadow: theme.shadows[4],
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const BlogCard = ({ title, excerpt, image, date }) => {
  return (
    <StyledCard>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
          sx={{
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        />
        <CardContent sx={{ px: 2.5, py: 3 }}>
          <Box display="flex" alignItems="center" mb={1.5}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                mr: 1,
                bgcolor: "primary.main",
              }}
            >
              <Typography variant="caption">D</Typography>
            </Avatar>
            <Typography variant="caption" color="text.secondary">
              {date}
            </Typography>
          </Box>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              mb: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {excerpt}
          </Typography>
          <Chip
            label="Read more"
            size="small"
            sx={{
              bgcolor: "action.hover",
              color: "text.primary",
              fontWeight: 500,
            }}
          />
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default BlogCard;
