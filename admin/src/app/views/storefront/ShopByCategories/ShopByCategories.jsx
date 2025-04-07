import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import PropTypes from "prop-types";

// Category data with names and image URLs
const CATEGORIES = [
  {
    id: 1,
    name: "Vegetables",
    image: "assets/images/shopbycategories/Vegetables.jpg",
  },
  {
    name: "Exotic Vegetables",
    image: "assets/images/shopbycategories/Vegetables.jpg",
  },
  { name: "Fruits", image: "assets/images/shopbycategories/Vegetables.jpg" },
  {
    name: "Exotic Fruits",
    image: "assets/images/shopbycategories/Vegetables.jpg",
  },
  { name: "Flowers", image: "assets/images/shopbycategories/Vegetables.jpg" },
  {
    name: "Exotic Flowers",
    image: "assets/images/shopbycategories/Vegetables.jpg",
  },
];

// Updated CategoryButton component with improved design
const CategoryButton = React.memo(({ name, image, onClick, isActive }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      borderRadius: 2,
      boxShadow: isActive ? 3 : 1,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: 4,
        "& .category-image": {
          transform: "scale(1.05)",
        },
      },
    }}
  >
    <Button
      onClick={() => onClick?.(name)}
      aria-label={`Shop ${name}`}
      sx={{
        width: "100%",
        height: "100%",
        p: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        component="img"
        src={image}
        alt={name}
        className="category-image"
        sx={{
          width: "100%",
          height: 120,
          objectFit: "cover",
          transition: "transform 0.3s ease",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      />
      <Box
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: isActive ? "primary.main" : "text.primary",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            mt: 0.5,
            display: { xs: "none", sm: "block" },
          }}
        >
          Shop Now
        </Typography>
      </Box>
    </Button>
  </Box>
));

const ShopByCategories = ({
  title = "Shop By Categories",
  categories = CATEGORIES,
  onCategoryClick = () => {},
  selectedCategory = "",
}) => {
  if (!categories?.length) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          mb: 6,
          color: "text.primary",
          fontSize: { xs: "1.8rem", sm: "2.2rem" },
          position: "relative",
          "&:after": {
            content: '""',
            display: "block",
            width: 80,
            height: 4,
            backgroundColor: "primary.main",
            margin: "16px auto 0",
            borderRadius: 2,
          },
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            lg: "repeat(6, 1fr)",
          },
          gap: 4,
          mb: 6,
        }}
      >
        {categories.map((category) => (
          <CategoryButton
            key={category.name}
            name={category.name}
            image={category.image}
            onClick={onCategoryClick}
            isActive={selectedCategory === category.name}
          />
        ))}
      </Box>
    </Container>
  );
};

ShopByCategories.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  onCategoryClick: PropTypes.func,
  selectedCategory: PropTypes.string,
};

export default ShopByCategories;
