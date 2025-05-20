import React, { useState } from "react";
import { apiConfig } from "../../../../config";
import {
  Box,
  Typography,
  Container,
  CardMedia,
  Grid,
  Button,
  Divider,
  Chip,
  Rating,
  Stack,
  IconButton,
  useTheme,
  Paper,
  CircularProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  LinearProgress,
  TextField,
} from "@mui/material";

import {
  ShoppingCart,
  FavoriteBorder,
  Share,
  LocalShipping,
  Verified,
  Description as DescriptionIcon,
  Info as InfoIcon,
  Policy as PolicyIcon,
  RateReview as ReviewIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useProduct } from "../../../../hooks/useProducts";
import { useCartStore } from "../../../../store/cartStore";
import { handleAddToCartWithAuthCheck } from "../../../../utils/authCartHandler";
import { useReviews } from "../../../../hooks/reviewHooks";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const ProductDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const [activeTab, setActiveTab] = useState(0);
  const { data: reviews } = useReviews();
  const cart = useCartStore((state) => state.cart) || [];
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const [quantity, setQuantity] = useState(1);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      updateCartItemQuantity(product.id, newQty);
    }
  };

  const increaseQuantity = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    updateCartItemQuantity(product.id, newQty);
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    const cart = useCartStore((state) =>
      Array.isArray(state.cart) ? state.cart : []
    );
    const existingItem = cart.items?.find(
      (item) => item.product_id === productId
    );
    if (existingItem) {
      addToCart(existingItem.product, newQuantity, true);
    }
  };

  if (isLoading || !product) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Step 1: Filter reviews for current product
  const filteredReviews = (reviews ?? []).filter(
    (review) => String(review.product_id) === String(product.id)
  );

  // Step 2: Compute total and average rating
  const totalReviews = filteredReviews?.length || 0;

  const averageRating =
    totalReviews > 0
      ? (
          filteredReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        ).toFixed(1)
      : 0;

  // Step 3: Count stars
  const starCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = filteredReviews.filter((r) => r.rating === star).length;
    return { label: `${star} Star`, count };
  });

  // Step 4: Convert counts to percentages
  const ratingsData = starCounts.map((item) => ({
    label: item.label,
    value:
      totalReviews > 0 ? ((item.count / totalReviews) * 100).toFixed(1) : 0,
  }));

  const ratingsDataOld = [
    { label: "5 Star", value: 68 },
    { label: "4 Star", value: 67 },
    { label: "3 Star", value: 42 },
    { label: "2 Star", value: 30 },
    { label: "1 Star", value: 24 },
  ];

  const isOutOfStock = product?.stock_level === "out_of_stock";

  // Tab content components
  const tabContents = [
    {
      label: "Description",
      icon: <DescriptionIcon fontSize="small" />,
      content: (
        <Typography variant="body1" paragraph>
          {product.description || "No description available."}
        </Typography>
      ),
    },
    {
      label: "Additional Info",
      icon: <InfoIcon fontSize="small" />,
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>
            Product Details
          </Typography>
          <TableContainer>
            <Table
              size="small"
              aria-label="product details"
              sx={{ border: "1px solid #ccc" }}
            >
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: "1px solid #ccc" }}>
                    <strong>SKU</strong>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc" }}>
                    {product.sku}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: "1px solid #ccc" }}>
                    <strong>Category</strong>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc" }}>
                    {product.category.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: "1px solid #ccc" }}>
                    <strong>Quality Grade</strong>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc" }}>
                    {product.quality}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: "1px solid #ccc" }}>
                    <strong>Additional Details</strong>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc" }}>
                    {product.ud_field || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: "1px solid #ccc" }}>
                    <strong>AMPC Name</strong>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc" }}>
                    {product.apmc.name}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ),
    },
    {
      label: "Return Policy",
      icon: <PolicyIcon fontSize="small" />,
      content: (
        <Typography variant="body1" paragraph>
          {product.return_policy || "Standard return policy applies."}
        </Typography>
      ),
    },
    {
      label: "Reviews",
      icon: <ReviewIcon fontSize="small" />,
      content: (
        <Box>
          <Grid container spacing={4}>
            {/* Rating Breakdown */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Customer reviews
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {averageRating} out of 5 ({totalReviews} review
                {totalReviews !== 1 ? "s" : ""})
              </Typography>
              <Box mt={2}>
                {ratingsData.map((row, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <Typography sx={{ width: 70 }}>{row.label}</Typography>
                    <Box sx={{ flexGrow: 1, mx: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={row.value}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: "#e5e7eb",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#8b0c1c",
                          },
                        }}
                      />
                    </Box>
                    <Typography sx={{ width: 40 }}>{row.value}%</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Review Form */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Add a review
              </Typography>
              <ReviewForm productId={id} />
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <ReviewList productId={id} />
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={4} justifyContent="space-evenly">
          {/* Product Images */}
          <Grid>
            <Box
              sx={{
                border: "1px solid #f0f0f0",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
              }}
            >
              <CardMedia
                component="img"
                image={`${apiConfig.MEDIA_URL}${
                  product?.image || "placeholder.jpg"
                }`}
                alt={product?.name}
                sx={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "contain",
                }}
              />
            </Box>
            <Stack direction="row" spacing={1} mt={2} justifyContent="center">
              {[1].map((item) => (
                <Box
                  key={item}
                  sx={{
                    width: 60,
                    height: 60,
                    border: "1px solid #f0f0f0",
                    borderRadius: 1,
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <img
                    src={`${apiConfig.MEDIA_URL}${
                      product?.image || "placeholder.jpg"
                    }`}
                    alt={`Thumbnail ${item}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Product Info */}
          <Grid>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {product?.name}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <Rating
                value={product?.rating || 4.2}
                precision={0.1}
                readOnly
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                {product?.reviews || 0} Ratings & Reviews
              </Typography>
              <Chip
                label="Verified"
                size="small"
                icon={<Verified fontSize="small" />}
                sx={{ backgroundColor: "#e3f2fd" }}
              />
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight={700} mb={1}>
              Rs {product?.price}
              {product?.originalPrice && (
                <Typography
                  component="span"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.disabled",
                    ml: 1,
                    fontSize: "1rem",
                  }}
                >
                  Rs {product.originalPrice}
                </Typography>
              )}
              {product?.discount && (
                <Typography
                  component="span"
                  color="success.main"
                  sx={{ ml: 1, fontSize: "1rem" }}
                >
                  {product.discount}% off
                </Typography>
              )}
            </Typography>

            <Typography
              color="error.main"
              fontWeight={600}
              mb={0.1}
              sx={{ fontSize: "0.85rem", py: 0.75 }}
            >
              Item Weight: {product.unit ? `Per / ${product.unit}` : "N/A"}
            </Typography>
            <Typography
              color={isOutOfStock ? "error.main" : "success.main"}
              fontWeight={600}
              mb={0.1}
              sx={{
                fontSize: "0.85rem",
                py: 0.75,
                borderRadius: 1,
                textTransform: "capitalize",
              }}
            >
              Stock: {product.stock_level?.replaceAll("_", " ")}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>Description:</strong> {product?.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>Production:</strong> {product?.production}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>Store Information</strong>
            </Typography>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                p: 2,
                borderRadius: 2,
                mt: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary" mb={1}>
                <strong>SKU :</strong> {product.sku}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                <strong>Category:</strong> {product.category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                <strong>APMC :</strong> {product.apmc.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                <strong>Quality :</strong> {product.quality}
              </Typography>
            </Box>
          </Grid>

          {/* Actions */}
          <Grid>
            <Paper elevation={0} sx={{ p: 2, border: "1px solid #f0f0f0" }}>
              {/* <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Delivery Options
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <LocalShipping color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography>
                    Delivery to <strong>Delhi 110001</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Usually delivered in 3-4 days
                  </Typography>
                </Box>
              </Box> */}

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Seller Information
              </Typography>
              <Typography variant="body2" gutterBottom>
                Name: <strong>{product.seller.first_name}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.return_policy}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Quantity Selector */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                  backgroundColor: "background.paper",
                  boxShadow: 1,
                  width: "fit-content",
                }}
              >
                <Button
                  variant="text"
                  size="small"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1 || isOutOfStock}
                  sx={{
                    minWidth: 32,
                    fontWeight: "bold",
                    color: "text.primary",
                    "&:hover": { backgroundColor: "grey.100" },
                  }}
                >
                  −
                </Button>
                <Typography
                  sx={{
                    minWidth: 28,
                    textAlign: "center",
                    fontWeight: 500,
                    color: isOutOfStock ? "text.disabled" : "text.primary",
                  }}
                >
                  {quantity}
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  onClick={increaseQuantity}
                  disabled={isOutOfStock}
                  sx={{
                    minWidth: 32,
                    fontWeight: "bold",
                    color: "text.primary",
                    "&:hover": { backgroundColor: "grey.100" },
                  }}
                >
                  +
                </Button>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Add to Cart Button */}
              <Button
                fullWidth
                variant="contained"
                color="error"
                size="large"
                startIcon={<ShoppingCart />}
                disabled={isOutOfStock}
                onClick={() =>
                  handleAddToCartWithAuthCheck({
                    product,
                    quantity,
                    addToCart,
                    replace: true,
                  })
                }
                sx={{ mb: 2, py: 1.5, fontWeight: 600 }}
              >
                {isOutOfStock ? "Sold Out" : "Add to Cart"}
              </Button>

              <Stack direction="row" spacing={1} mt={2}>
                <IconButton>
                  <FavoriteBorder />
                </IconButton>
                <IconButton>
                  <Share />
                </IconButton>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Tabs Section */}
        <Box sx={{ mt: 6, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.error.main,
                height: 3,
              },
            }}
          >
            {tabContents.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  color:
                    activeTab === index
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                  "&:hover": {
                    color: theme.palette.error.main,
                    backgroundColor: theme.palette.action.hover,
                  },
                  "&.Mui-selected": {
                    color: theme.palette.error.main,
                  },
                }}
              />
            ))}
          </Tabs>
          <Divider />
          <Box sx={{ p: 3 }}>{tabContents[activeTab].content}</Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
