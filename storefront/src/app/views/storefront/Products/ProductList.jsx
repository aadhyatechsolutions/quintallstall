import React, { useEffect } from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useProducts } from "../../../../hooks/useProducts";
import CategoriesList from "../Categories/CategoriesList";

const ProductList = () => {
  const { data: products = [], isLoading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const sellerParam = searchParams.get("seller");

  // Local state for selected category ID
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(
    categoryParam ? parseInt(categoryParam) : null
  );
  const [selectedSellerId, setSelectedSellerId] = React.useState(
    sellerParam ? parseInt(sellerParam) : null
  );

  // Whenever the category query parameter changes, update selectedCategoryId
  useEffect(() => {
    setSelectedCategoryId(categoryParam ? parseInt(categoryParam) : null);
    setSelectedSellerId(sellerParam ? parseInt(sellerParam) : null);
  }, [categoryParam,sellerParam]);

  // Filter products based on selected category
  const filteredProducts = products.filter(
    (product) =>
      product.status === "active" &&
      (!selectedCategoryId || product.category_id === selectedCategoryId)&&
      (!selectedSellerId || product.seller.id === selectedSellerId)
  );

  return (
    <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, sm: 3 } }}>
      {/* Title */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            mb: 3,
            background: `linear-gradient(45deg, #b6131a, #2b4a05)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2rem", md: "2.8rem" },
          }}
        >
          Our Products
        </Typography>
      </Box>

      {/* Categories List */}
      <CategoriesList
        selectedCategoryId={selectedCategoryId}
        onCategoryClick={(id) => {
          // Update URL query parameter when a category is clicked
          setSelectedCategoryId(id);
          if (id) {
            // Update query parameter to reflect the selected category
            window.history.replaceState(
              null,
              "",
              `?category=${id}`
            );
          } else {
            window.history.replaceState(null, "", window.location.pathname); // Reset category query param
          }
        }}
      />

      {/* Product Cards */}
      <Grid container rowSpacing={2} columnSpacing={1} justifyContent="center">
        {filteredProducts.map((product) => (
          <Grid
            key={product.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* No Products Message */}
      {!isLoading && filteredProducts.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="body1">
            No products found in this category.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ProductList;
