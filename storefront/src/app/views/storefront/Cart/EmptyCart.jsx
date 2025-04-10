import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Your cart is empty
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Looks like you haven’t added anything yet.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/products")}
        sx={{
          textTransform: "none",
          backgroundColor: "black",
          color: "white",
          px: 4,
          py: 1.5,
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        Browse Products
      </Button>
    </Box>
  );
};

export default EmptyCart;
