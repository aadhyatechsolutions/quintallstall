import React from "react";
import { apiConfig } from "../../../../../config";
import {
  Box,
  Typography,
  Card,
  IconButton,
  Grid,
  CircularProgress,
  Button,
  Chip,
  useTheme,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useWishlist } from "../../../../../hooks/wishlistHooks";
import { deleteWishlistItem } from "../../../../../utils/wishlistService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const theme = useTheme();
  const { data, isLoading, error } = useWishlist();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: deleteWishlistItem,
    onSuccess: () => queryClient.invalidateQueries(["wishlist"]),
    onError: (error) =>
      console.error("Failed to remove wishlist item:", error.message),
  });

  const handleRemove = (id) => deleteMutation.mutate(id);
  const handleCardClick = (productId) => navigate(`/products/${productId}`);

  if (isLoading) {
    return (
      <Box textAlign="center" py={6}>
        <CircularProgress />
        <Typography variant="body1" mt={2}>
          Loading your wishlist...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={6}>
        <FavoriteBorderIcon color="error" sx={{ fontSize: 48 }} />
        <Typography variant="h6" color="error" mt={2}>
          Failed to load wishlist
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Please try again later.
        </Typography>
      </Box>
    );
  }

  const items = data?.items || [];

  return (
    <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 2, md: 4 }, py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          My Wishlist
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {items.length} {items.length === 1 ? "item" : "items"}
        </Typography>
      </Box>

      {items.length === 0 ? (
        <Box textAlign="center" py={6}>
          <FavoriteBorderIcon
            sx={{ fontSize: 64, color: theme.palette.grey[400], mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary" mb={1}>
            Your wishlist is empty
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Save your favorite items here for later
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "translateY(-6px)" },
                }}
              >
                <IconButton
                  onClick={() => handleRemove(item.id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 2,
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: theme.palette.error.light,
                      color: "white",
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>

                <CardMedia
                  component="img"
                  height="125"
                  image={
                    item.product.image
                      ? `${apiConfig.MEDIA_URL}${item.product.image}`
                      : "/placeholder.jpg"
                  }
                  alt={item.product.name}
                  onClick={() => handleCardClick(item.product.id)}
                  sx={{
                    objectFit: "cover",
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer",
                  }}
                />

                <CardContent sx={{ p: 1.5 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    gutterBottom
                    noWrap
                  >
                    {item.product.name}
                  </Typography>

                  <Box mt={1} display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6" color="error" fontWeight={700}>
                      Rs {item.product.discountPrice || item.product.price}
                    </Typography>
                    {item.product.discountPrice && (
                      <>
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: "line-through",
                            color: "text.secondary",
                          }}
                        >
                          ₹{item.product.price}
                        </Typography>
                        <Chip
                          label={`${Math.round(
                            ((item.product.price - item.product.discountPrice) /
                              item.product.price) *
                              100
                          )}% OFF`}
                          size="small"
                          color="error"
                        />
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Wishlist;
