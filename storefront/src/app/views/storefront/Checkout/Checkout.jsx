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
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useCartStore } from "../../../../store/cartStore";
import { useOrderStore } from "../../../../store/orderStore";
import { useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CURRENCY = "Rs";

const Checkout = () => {
  const { cart, clearCart, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const { placeOrder } = useOrderStore();
  const navigate = useNavigate();

  // Form state
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
  const [orderError, setOrderError] = useState("");

  // Payment method state (default is 'cod')
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Calculate order totals
  const calculateOrderDetails = () => {
    const cartItems = cart?.items || [];
    const subtotal = cartItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0),
      0
    );
    const shipping = 0; // You can add shipping calculation here
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  };

  const orderDetails = calculateOrderDetails();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Validate form fields
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

  // Check if form is complete
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

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || cart.length === 0) return;

    setIsSubmitting(true);
    setOrderError("");

    try {
      const shipping_address = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zip}`;
      const amount = parseFloat(orderDetails.total.toFixed(2));

      const orderPayload = {
        shipping_address,
        payment_method: paymentMethod, // Using selected payment method
        amount
      };

      const { success, data, error } = await placeOrder(orderPayload);
      
      if (success) {
        setOrderSuccess(true);
        clearCart();
        setTimeout(() => navigate(`/order-success`), 2000);
      } else {
        setOrderError(error || "Order failed. Please try again.");
      }
    } catch (error) {
      setOrderError("Something went wrong. Please try again.");
      console.error("Order submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form fields configuration
  const formFields = [
    { label: "Full Name", name: "name", type: "text" },
    { label: "Address", name: "address", type: "text" },
    { label: "City", name: "city", type: "text" },
    { label: "State", name: "state", type: "text" },
    { label: "ZIP Code", name: "zip", type: "text" },
    { label: "Phone Number", name: "phone", type: "tel" },
    { label: "Email Address", name: "email", type: "email" },
  ];

  // Success state
  if (orderSuccess) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          Order placed successfully! Redirecting...
        </Alert>
      </Box>
    );
  }

  // Empty cart state
  if (cart.length === 0) {
    return (
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
    );
  }

  // Main checkout form
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

      <Grid container spacing={3}>
        {/* Left Column - Cart Items and Shipping Info */}
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

          {/* Shipping Information */}
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
                  {formFields.map(({ label, name, type }) => (
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

        {/* Right Column - Order Summary */}
        <Grid size={{ xs: 12, sm: 4, md: 4 }} >
          <Paper elevation={1} sx={{ borderRadius: 2, mb: 4 }} >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="medium"
                sx={{ display: "flex", alignItems: "center", gap: 1, color: "#b6131a" }}
              >
                <PaymentIcon /> Payment Method
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {/* Payment Method Selection Box */}
              <Box sx={{ padding: 2, borderRadius: 2, backgroundColor: "#f5f5f5" }}>
                <RadioGroup
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery (COD)" />
                  {/* <FormControlLabel value="card" control={<Radio />} label="Credit Card" /> */}
                  {/* <FormControlLabel value="paypal" control={<Radio />} label="PayPal" /> */}
                </RadioGroup>
              </Box>
            </CardContent>
          </Paper>

          {/* Order Summary */}
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

              {/* Order Breakdown */}
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

              <Divider sx={{ my: 2 }} />

              {/* Total */}
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {CURRENCY} {orderDetails.total.toFixed(2)}
                </Typography>
              </Box>

              {/* Place Order Button */}
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

              {/* Error Message */}
              {orderError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {orderError}
                </Alert>
              )}
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
