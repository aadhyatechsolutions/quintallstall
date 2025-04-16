import React from "react";
import { Box, Grid, Typography, Container, Button } from "@mui/material";
import ProductCard from "./ProductCard";
import { useProducts } from "../../../../hooks/useProducts";
import CategoriesList from "../Categories/CategoriesList";

const ProductList = () => {
  const [value, setValue] = React.useState(0);
  const { data: products = [], isLoading, error } = useProducts();
  const activeProducts = products.filter((product) => product.status === "active");

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
      {/* categories List*/}
      <CategoriesList />

      {/* Product Cards */}
      <Grid container rowSpacing={2} columnSpacing={1} justifyContent="center">
        {activeProducts.map((product) => (
          <Grid
            key={product.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Load More Button */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button
          variant="outlined"
          color="error"
          size="large"
          sx={{
            px: 6,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
            },
          }}
        >
          Load More Products
        </Button>
      </Box>
    </Container>
  );
};

export default ProductList;
