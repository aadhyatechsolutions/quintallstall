import React from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { productsList } from "./products";

const ProductList = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, sm: 3 } }}>
      {/* Title & Tabs */}
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

      {/* Product Cards */}
      <Grid container spacing={1}>
        {productsList.map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={product.id}
            sx={{ display: "flex" }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Load More */}
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
