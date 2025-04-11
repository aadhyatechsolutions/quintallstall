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
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No order found.</Typography>
      </Box>
    );
  }

  const { cart, formData, orderDetails, date } = order;

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
            <Typography variant="caption" color="text.secondary">
              Order Date: {new Date(date).toLocaleString()}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Shipping Info
          </Typography>
          <Typography>Name: {formData.name}</Typography>
          <Typography>
            Address: {formData.address}, {formData.city}, {formData.state} -{" "}
            {formData.zip}
          </Typography>
          <Typography>Phone: {formData.phone}</Typography>
          <Typography>Email: {formData.email}</Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Items Ordered
          </Typography>
          <List dense>
            {cart.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={`${item.name} (x${item.quantity})`}
                  secondary={`Rs ${item.price} each`}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Subtotal:</Typography>
            <Typography>Rs {orderDetails.subtotal.toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Shipping:</Typography>
            <Typography>Rs {orderDetails.shipping.toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Tax:</Typography>
            <Typography>Rs {orderDetails.tax.toFixed(2)}</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            fontWeight="bold"
            mt={2}
          >
            <Typography>Total:</Typography>
            <Typography>Rs {orderDetails.total.toFixed(2)}</Typography>
          </Box>
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
              onClick={() => navigate("/")}
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
