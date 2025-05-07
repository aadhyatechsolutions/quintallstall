import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useProducts } from "../../../../hooks/useProducts";
import CategoriesList from "../Categories/CategoriesList";

const ProductList = () => {
  const { data: products = [], isLoading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const sellerParam = searchParams.get("seller");

  const [selectedCategoryId, setSelectedCategoryId] = React.useState(
    categoryParam ? parseInt(categoryParam) : null
  );
  const [selectedSellerId, setSelectedSellerId] = React.useState(
    sellerParam ? parseInt(sellerParam) : null
  );

  const [sortBy, setSortBy] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    setSelectedCategoryId(categoryParam ? parseInt(categoryParam) : null);
    setSelectedSellerId(sellerParam ? parseInt(sellerParam) : null);
  }, [categoryParam, sellerParam]);

  const filteredProducts = products
    .filter(
      (product) =>
        product.status === "active" &&
        (!selectedCategoryId || product.category_id === selectedCategoryId) &&
        (!selectedSellerId || product.seller.id === selectedSellerId) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "priceLowHigh":
          return a.price - b.price;
        case "priceHighLow":
          return b.price - a.price;
        case "nameAZ":
          return a.name.localeCompare(b.name);
        case "nameZA":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

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
          setSelectedCategoryId(id);
          if (id) {
            window.history.replaceState(null, "", `?category=${id}`);
          } else {
            window.history.replaceState(null, "", window.location.pathname);
          }
        }}
      />

      {/* Search and Sort Controls */}
      <Grid container rowSpacing={2} columnSpacing={1} justifyContent="center">
        <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
            p={3}
            bgcolor="#f9f9f9"
            borderRadius={3}
            // boxShadow={1}
            mb={4}
          >
            
            <TextField
              label="Search Products"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              sx={{ maxWidth: 400 }}
              InputProps={{
                sx: { borderRadius: 2 },
              }}
            />

            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
                <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
                <MenuItem value="nameAZ">Name: A to Z</MenuItem>
                <MenuItem value="nameZA">Name: Z to A</MenuItem>
              </Select>
            </FormControl>
          </Box>
      </Grid>

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
            No products found matching your criteria.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ProductList;
