import React from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const CartSummary = ({ total }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleCheckoutClick = () => {
    navigate("/checkout"); // Redirect to checkout page
  };
  const handleReturnToShopping = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        background: "#f9f9f9",
        borderRadius: 3,
        p: 3,
        minWidth: 300,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* <Typography fontWeight={600} mb={2}>
        Promo code
      </Typography>
      <Stack direction="row" spacing={1} mb={2}>
        <TextField fullWidth size="small" placeholder="Type here..." />
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            background: "#2b4a04",
            "&:hover": { background: "#3f6313" },
          }}
        >
          Apply
        </Button>
      </Stack> */}
       <Typography>Cart Total</Typography>
      <Divider sx={{ my: 2 }} />

      <Stack spacing={1} mb={2}>
        {/* <Typography>
          Discount: <strong>Rs: 0.00</strong>
        </Typography> */}
        <Typography variant="h6">
          Total:{" "}
          <Box component="span" fontWeight="bold">
            RS:{total.toFixed(2)}
          </Box>
        </Typography>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        sx={{
          background: "#2b4a04",
          color: "#fff",
          textTransform: "none",
          mt: 2,
          "&:hover": { background: "#3f6313" },
        }}
        onClick={handleCheckoutClick}
      >
        Continue to checkout
      </Button>
      <Button
        fullWidth
        variant="contained"
        sx={{
          background: "#2b4a04",
          color: "#fff",
          textTransform: "none",
          mt: 2,
          "&:hover": { background: "#3f6313" },
        }}
        startIcon={<ArrowBackIcon />}
        onClick={handleReturnToShopping}
      >
        Return To Shopping
      </Button>
    </Box>
  );
};

export default CartSummary;
