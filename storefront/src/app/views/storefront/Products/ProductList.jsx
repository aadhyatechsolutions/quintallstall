import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useProducts } from "../../../../hooks/useProducts";
import CategoriesList from "../Categories/CategoriesList";

const ProductList = () => {
  const { data: products = [], isLoading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategoryId, setSelectedCategoryId] = React.useState(
    categoryParam ? parseInt(categoryParam) : null
  );

  const filteredProducts = products.filter(
    (product) =>
      product.status === "active" &&
      (!selectedCategoryId || product.category_id === selectedCategoryId)
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
        onCategoryClick={(id) =>
          setSelectedCategoryId((prev) => (prev === id ? null : id))
        }
      />

      {/* Product Cards */}
      <Grid container rowSpacing={2} columnSpacing={1} justifyContent="center">
        {filteredProducts.map((product) => (
          <Grid
            key={product.id}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
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
