import React from "react";
import {
  Paper,
  Typography,
  IconButton,
  CardMedia,
  CardContent,
  Box,
  Chip,
  Rating,
  Button,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";

const ProductCard = ({ product }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        width: 290,
        height: "auto",
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: theme.shadows[6],
          "& .product-actions": {
            opacity: 1,
          },
        },
      }}
    >
      {/* Discount Chip */}
      {product.discount && (
        <Chip
          label={`${product.discount}% OFF`}
          color="error"
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            fontWeight: "bold",
            zIndex: 1,
          }}
        />
      )}

      {/* Product Image */}
      <CardMedia
        component="img"
        height="175"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />

      {/* Hover Actions */}
      <Box
        className="product-actions"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <IconButton
          size="small"
          sx={{
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "rgba(182, 19, 26, 0.1)" },
          }}
        >
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "rgba(182, 19, 26, 0.1)" },
          }}
        >
          <ShareIcon fontSize="small" />
        </IconButton>
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 1.5,
          overflow: "hidden",
        }}
      >
        {/* Category Tag */}
        <Chip
          label={product.category.name}
          size="small"
          sx={{
            mb: 1,
            alignSelf: "flex-start",
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(43, 74, 5, 0.3)"
                : "rgba(43, 74, 5, 0.1)",
            color: theme.palette.mode === "dark" ? "#c8e6c9" : "#2b4a05",
          }}
        />

        {/* Product Name */}
        <Typography
          variant="subtitle1"
          fontWeight={700}
          gutterBottom
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            value={product.rating || 4}
            precision={0.5}
            size="small"
            readOnly
          />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviews || 0})
          </Typography>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flexGrow: 1,
          }}
        >
          {product.description}
        </Typography>

        {/* Price and Add to Cart */}
        <Box
          sx={{
            mt: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Box>
            {product.originalPrice && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "text.disabled",
                }}
              >
                Rs {product.originalPrice}
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{ color: theme.palette.error.main, fontWeight: 700 }}
            >
              Rs {product.price}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<ShoppingCartIcon />}
            sx={{
              borderRadius: 2,
              px: 2,
              py: 1,
              textTransform: "none",
              bgcolor: theme.palette.error.main,
              "&:hover": {
                bgcolor: theme.palette.error.dark,
              },
            }}
          >
            Add
          </Button>
        </Box>
      </CardContent>
    </Paper>
  );
};

export default ProductCard;
