import React, { useEffect, useState } from "react";
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
import useCommissionStore from "../../../../store/useCommissionStore";
import EmptyCart from "../Cart/EmptyCart";

const CURRENCY = "Rs";

const Checkout = () => {
  const {
    cart,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();
  
  const { placeOrder } = useOrderStore();
  const navigate = useNavigate();
  const {
    platformCommission,
    wageCost,
    wageCommissionRate,
    taxes,
    isLoading: commissionLoading,
    fetchCommissions,
  } = useCommissionStore();

  useEffect(() => {
    fetchCommissions();
  }, [fetchCommissions]);

  
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
    
    // Calculate commissions and taxes
    // const platformCommissionAmount = (subtotal * (platformCommission || 0)) / 100;
    const platformCommissionAmount = platformCommission;
    // const wageCommissionAmount = wageCost > 0 ? wageCost : (subtotal * (wageCommissionRate || 0)) / 100;
    const wageCommissionAmount = wageCost;
    
    // Calculate taxes (GST example)
    const cgstAmount = (subtotal * (taxes?.cgst || 0)) / 100;
    const sgstAmount = (subtotal * (taxes?.sgst || 0)) / 100;
    const igstAmount = (subtotal * (taxes?.igst || 0)) / 100;
    const totalTaxes = cgstAmount + sgstAmount + igstAmount;
    
    const shipping = 0; // You can add shipping calculation here
    
    // Calculate total with all fees
    const total = subtotal + shipping + platformCommissionAmount + wageCommissionAmount + totalTaxes;
    
    return { 
      subtotal: subtotal || 0,
      shipping: shipping || 0,
      platformCommission: platformCommissionAmount || 0,
      wageCommission: wageCommissionAmount || 0,
      taxes: totalTaxes || 0,
      taxDetails: { cgst: cgstAmount, sgst: sgstAmount, igst: igstAmount },
      total: total || 0
    };
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
        payment_method: paymentMethod,
        amount,
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
  if (!cart.items || cart.items.length === 0) {
    return (
      <EmptyCart/>
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
        <Grid size={{xs:12 , md:8}}>
          {/* Cart Items */}
          <Paper elevation={1} sx={{ mb: 4, borderRadius: 2 }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="medium"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#b6131a",
                }}
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#b6131a",
                }}
              >
                <LocalShippingIcon /> Shipping Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {formFields.map(({ label, name, type }) => (
                  <Grid size={{xs:12,sm:6}} key={name}>
                    <TextField
                      fullWidth
                      label={label}
                      name={name}
                      type={type}
                      value={formData[name]}
                      onChange={(e) => {
                        const { value } = e.target;

                        if (["name", "city", "state"].includes(name)) {
                          // Allow only letters and spaces
                          if (/^[a-zA-Z\s]*$/.test(value)) {
                            handleInputChange(e);
                          }
                        }
                        else if (name === "zip") {
                          // ZIP Code: Allow only 0–6 digits
                          if (/^\d{0,6}$/.test(value)) {
                            handleInputChange(e);
                          }
                        } else if (name === "phone") {
                          // Phone Number: Allow only 0–10 digits
                          if (/^\d{0,10}$/.test(value)) {
                            handleInputChange(e);
                          }
                        } else {
                          handleInputChange(e);
                        }
                      }}
                      error={!!errors[name]}
                      helperText={errors[name]}
                      required
                      variant="outlined"
                      size="small"
                      inputProps={
                        name === "zip"
                          ? {
                              maxLength: 6,
                              inputMode: "numeric",
                              pattern: "\\d{6}",
                            }
                          : name === "phone"
                          ? {
                              maxLength: 10,
                              inputMode: "numeric",
                              pattern: "\\d{10}",
                            }
                          : {}
                      }
                    />
                  </Grid>
                ))}
              </Grid>


              </form>
            </CardContent>
          </Paper>
        </Grid>

        {/* Right Column - Order Summary */}
        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <Paper elevation={1} sx={{ borderRadius: 2, mb: 4 }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="medium"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#b6131a",
                }}
              >
                <PaymentIcon /> Payment Method
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {/* Payment Method Selection Box */}
              <Box
                sx={{ padding: 2, borderRadius: 2, backgroundColor: "#f5f5f5" }}
              >
                <RadioGroup
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label="Cash on Delivery (COD)"
                  />
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#b6131a",
                }}
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

            {/* Wage Cost/Commission */}
              {(wageCost > 0 || wageCommissionRate > 0) && (
                <Box display="flex" justifyContent="space-between" mb={1.5}>
                  <Typography variant="body2">
                    {wageCost > 0 ? "Fixed Wage Cost" : `Wage Commission (${wageCommissionRate}%)`}
                  </Typography>
                  <Typography variant="body2">
                    {CURRENCY} {orderDetails.wageCommission.toFixed(2)}
                  </Typography>
                </Box>
              )}

              {/* Platform Commission */}
              {platformCommission > 0 && (
                <Box display="flex" justifyContent="space-between" mb={1.5}>
                  <Typography variant="body2">Platform Fee</Typography>
                  <Typography variant="body2">
                    {CURRENCY} {orderDetails.platformCommission.toFixed(2)}
                  </Typography>
                </Box>
              )}

              {/* Taxes */}
              {(taxes?.cgst > 0 || taxes?.sgst > 0 || taxes?.igst > 0) && (
                <>
                  {taxes.cgst > 0 && (
                    <Box display="flex" justifyContent="space-between" mb={1.5}>
                      <Typography variant="body2">CGST ({taxes.cgst}%)</Typography>
                      <Typography variant="body2">
                        {CURRENCY} {orderDetails.taxDetails.cgst.toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                  {taxes.sgst > 0 && (
                    <Box display="flex" justifyContent="space-between" mb={1.5}>
                      <Typography variant="body2">SGST ({taxes.sgst}%)</Typography>
                      <Typography variant="body2">
                        {CURRENCY} {orderDetails.taxDetails.sgst.toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                  {taxes.igst > 0 && (
                    <Box display="flex" justifyContent="space-between" mb={1.5}>
                      <Typography variant="body2">IGST ({taxes.igst}%)</Typography>
                      <Typography variant="body2">
                        {CURRENCY} {orderDetails.taxDetails.igst.toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                </>
              )}

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
