import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("order-storage");
    if (savedOrder) {
      const parsed = JSON.parse(savedOrder);
      setOrderData(parsed?.state?.order || null);
    }
  }, []);

  if (!orderData) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No order found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
      <Card sx={{ maxWidth: 700, width: "100%", p: 3 }}>
        <CardContent>
          <Box textAlign="center" mb={3}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h4" fontWeight="bold">
              Thank You!
            </Typography>
            <Typography variant="body1" mt={1}>
              Your order has been placed successfully.
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Typography>Order ID: {orderData.order_id}</Typography>
          <Typography>Order Status: {orderData.order_status}</Typography>
          <Typography>Payment Status: {orderData.payment_status}</Typography>

          {/* Optional static message */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="text.secondary">
            You will receive an email with the order details and tracking
            information shortly.
          </Typography>

          <Box display="flex" justifyContent="center" mb={1}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{
                mt: 3,
                borderRadius: 2,
                width: "auto",
                alignSelf: "center",
              }}
              onClick={() => {
                localStorage.removeItem("order-storage"); // Optional: clear order
                navigate("/");
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderSuccess;
