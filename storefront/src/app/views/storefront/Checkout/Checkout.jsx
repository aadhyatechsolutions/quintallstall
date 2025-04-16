import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CardContent,
  Divider,
  Button,
  CircularProgress,
  Alert,
  TextField,
  Paper,
} from "@mui/material";
import { useCartStore } from "../../../../store/cartStore";
import { useOrderStore } from "../../../../store/orderStore";
import { useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const SHIPPING_COST = 50;
const CURRENCY = "Rs";
const TAX_RATE = 0.18;

const Checkout = () => {
  const {
    cart,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const { placeOrder } = useOrderStore(); // ✅ Call from Zustand store
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const calculateOrderDetails = () => {
    const cartItems = cart?.items || [];
    const subtotal = cartItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0),
      0
    );
    const tax = subtotal * TAX_RATE;
    const total = subtotal + SHIPPING_COST + tax;
    return { subtotal, shipping: SHIPPING_COST, tax, total };
  };

  const orderDetails = calculateOrderDetails();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormComplete = () => {
    return (
      formData.name &&
      formData.address &&
      formData.city &&
      formData.state &&
      formData.zip &&
      formData.phone &&
      formData.email &&
      Object.keys(errors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || cart.length === 0) return;

    setIsSubmitting(true);

    try {
      const shipping_address = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zip}`;
      const payment_method = "cod";
      const payment_status = "pending";
      const transaction_id = null;
      const amount = orderDetails.total;

      const orderPayload = {
        shipping_address,
        payment_method,
        amount,
        payment_status,
        transaction_id,
      };

      await placeOrder(orderPayload); // ✅ Trigger Zustand order logic

      setOrderSuccess(true);
      clearCart();
      setTimeout(() => navigate("/order-success"), 2000);
    } catch (err) {
      console.error("Order submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          Order placed successfully! Redirecting...
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
        marginBottom="40px"
        sx={{
          color: "#2b4a05",
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        Checkout
      </Typography>

      {cart.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Alert severity="warning" sx={{ mb: 3 }}>
            Your cart is empty.
          </Alert>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/products")}
            sx={{ borderRadius: 2, px: 4, py: 1.5, fontSize: "1rem" }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Cart Items */}
            <Paper elevation={1} sx={{ mb: 4, borderRadius: 2 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="medium"
                  sx={{ display: "flex", alignItems: "center", gap: 1, color: "#b6131a" }}
                >
                  <ShoppingCartIcon /> Cart Items
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {cart.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={() => removeFromCart(item.id)}
                    onIncrease={() => increaseQuantity(item.id)}
                    onDecrease={() => decreaseQuantity(item.id)}
                  />
                ))}
              </CardContent>
            </Paper>

            {/* Shipping Info */}
            <Paper elevation={1} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="medium"
                  sx={{ display: "flex", alignItems: "center", gap: 1, color: "#b6131a" }}
                >
                  <LocalShippingIcon /> Shipping Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {[ 
                      { label: "Full Name", name: "name" },
                      { label: "Address", name: "address" },
                      { label: "City", name: "city" },
                      { label: "State", name: "state" },
                      { label: "ZIP Code", name: "zip" },
                      { label: "Phone", name: "phone" },
                      { label: "Email", name: "email", type: "email" },
                    ].map(({ label, name, type = "text" }) => (
                      <Grid item xs={12} sm={6} key={name}>
                        <TextField
                          fullWidth
                          label={label}
                          name={name}
                          type={type}
                          value={formData[name]}
                          onChange={handleInputChange}
                          error={!!errors[name]}
                          helperText={errors[name]}
                          required
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                    ))}
                  </Grid>
                </form>
              </CardContent>
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="medium"
                  sx={{ display: "flex", alignItems: "center", gap: 1, color: "#b6131a" }}
                >
                  <PaymentIcon /> Order Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" justifyContent="space-between" mb={1.5}>
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">
                    {CURRENCY} {orderDetails.subtotal.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1.5}>
                  <Typography variant="body2">Shipping</Typography>
                  <Typography variant="body2">
                    {CURRENCY} {orderDetails.shipping.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1.5}>
                  <Typography variant="body2">Tax (18%)</Typography>
                  <Typography variant="body2">
                    {CURRENCY} {orderDetails.tax.toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {CURRENCY} {orderDetails.total.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="end">
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSubmit}
                    disabled={!isFormComplete() || isSubmitting}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      fontSize: "1rem",
                      boxShadow: "none",
                      width: "auto",
                      "&:hover": {
                        boxShadow: "none",
                        transform: "translateY(-2px)",
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </Box>
              </CardContent>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Checkout;
