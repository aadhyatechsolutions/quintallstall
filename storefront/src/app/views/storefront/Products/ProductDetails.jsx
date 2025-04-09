import React from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../../../../hooks/useProducts";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartStore } from "../../../../store/cartStore";

const ProductDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id);
  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) {
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 10 }} />;
  }

  if (error || !product) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        Error loading product details.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Card elevation={3}>
        {product.image ? (
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              maxHeight: 300,
              objectFit: "contain",
              borderBottom: "1px solid #eee",
            }}
          />
        ) : (
          <Box
            sx={{
              height: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#f5f5f5",
              borderBottom: "1px solid #eee",
            }}
          >
            <Typography color="text.secondary">No Image Available</Typography>
          </Box>
        )}

        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {product.description}
          </Typography>

          {product?.category?.name && (
            <Chip
              label={`Category: ${product.category.name}`}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<ShoppingCartIcon />}
            onClick={() => addToCart(product)}
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
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
