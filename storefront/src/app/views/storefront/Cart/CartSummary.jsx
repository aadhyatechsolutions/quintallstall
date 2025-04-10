import React from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  TextField,
  Button,
} from "@mui/material";

const CartSummary = ({ total }) => (
  <Box
    sx={{
      background: "#f9f9f9",
      borderRadius: 3,
      p: 3,
      minWidth: 300,
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    }}
  >
    <Typography fontWeight={600} mb={2}>
      Promo code
    </Typography>
    <Stack direction="row" spacing={1} mb={2}>
      <TextField fullWidth size="small" placeholder="Type here..." />
      <Button variant="contained" sx={{ textTransform: "none" }}>
        Apply
      </Button>
    </Stack>

    <Divider sx={{ my: 2 }} />

    <Stack spacing={1} mb={2}>
      <Typography>
        Discount: <strong>-$0.00</strong>
      </Typography>
      <Typography variant="h6">
        Total:{" "}
        <Box component="span" fontWeight="bold">
          {/* RS:{total.toFixed(2)} */}
        </Box>
      </Typography>
    </Stack>

    <Button
      fullWidth
      variant="contained"
      sx={{
        background: "black",
        color: "white",
        textTransform: "none",
        mt: 2,
        "&:hover": { background: "#333" },
      }}
    >
      Continue to checkout
    </Button>
  </Box>
);

export default CartSummary;
