import React from "react";
import { apiConfig } from "../../../../config";
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
  Tooltip,
  Badge,
} from "@mui/material";
import {
  ShoppingCart,
  FavoriteBorder,
  Share,
  CheckCircle,
  Error as ErrorIcon,
  Warning,
  Bolt,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../../store/cartStore";

// Stock configuration utility
const getStockConfig = (stockLevel, theme) => {
  const config = {
    in_stock: {
      text: "In Stock",
      color: theme.palette.success.main,
      icon: <CheckCircle fontSize="small" />,
      buttonText: "Add to Cart",
      disabled: false,
    },
    out_of_stock: {
      text: "Out of Stock",
      color: theme.palette.error.main,
      icon: <ErrorIcon fontSize="small" />,
      buttonText: "Sold Out",
      disabled: true,
    },
    low_stock: {
      text: "Low Stock",
      color: theme.palette.warning.main,
      icon: <Warning fontSize="small" />,
      buttonText: "Add to Cart",
      disabled: false,
    },
  };
  return config[stockLevel] || config.in_stock;
};

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const stockConfig = getStockConfig(product.stock_level, theme);

  const handleCardClick = () => navigate(`/products/${product.id}`);
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

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
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: theme.shadows[6],
          "& .product-actions": { opacity: 1 },
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

      {/* Stock Status Badge */}
      <Badge
        overlap="rectangular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        badgeContent={
          <Chip
            size="small"
            icon={stockConfig.icon}
            label={stockConfig.text}
            sx={{
              backgroundColor: stockConfig.color,
              color: theme.palette.getContrastText(stockConfig.color),
              fontWeight: "bold",
            }}
          />
        }
        sx={{
          "& .MuiBadge-badge": {
            top: 12,
            right: 12,
            transform: "none",
          },
        }}
      >
        <CardMedia
          component="img"
          height="175"
          image={`${apiConfig.MEDIA_URL}${product.image}`}
          alt={product.name}
          onClick={handleCardClick}
          sx={{ objectFit: "cover" }}
        />
      </Badge>

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
          zIndex: 1,
        }}
      >
        <IconButton
          size="small"
          sx={{
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "rgba(182, 19, 26, 0.1)" },
          }}
        >
          <FavoriteBorder fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "rgba(182, 19, 26, 0.1)" },
          }}
        >
          <Share fontSize="small" />
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

          {/* Enhanced Add to Cart Button */}
          <Tooltip
            title={
              stockConfig.disabled
                ? "This product is currently unavailable"
                : ""
            }
          >
            <span>
              <Button
                variant="contained"
                color={stockConfig.text === "Low Stock" ? "warning" : "error"}
                size="small"
                startIcon={<ShoppingCart />}
                endIcon={stockConfig.text === "Low Stock" ? "" : null}
                onClick={handleAddToCart}
                disabled={stockConfig.disabled}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  textTransform: "none",
                  bgcolor: stockConfig.disabled
                    ? theme.palette.grey[800]
                    : stockConfig.text === "Low Stock"
                    ? theme.palette.warning.main
                    : theme.palette.error.main,
                  "&:hover": {
                    bgcolor: stockConfig.disabled
                      ? theme.palette.grey[400]
                      : stockConfig.text === "Low Stock"
                      ? theme.palette.warning.dark
                      : theme.palette.error.dark,
                  },
                }}
              >
                {stockConfig.buttonText}
                {stockConfig.text === "Low Stock"}
              </Button>
            </span>
          </Tooltip>
        </Box>
      </CardContent>
    </Paper>
  );
};

export default ProductCard;
