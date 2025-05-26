import React, { useEffect } from "react";
import { Box, Typography, Grid, Button, styled } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { SimpleCard } from "app/components";
import useOrderStore from "../../store/order/orderStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function OrderDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchOrderById, currentOrder } = useOrderStore();

  useEffect(() => {
    fetchOrderById(id);
  }, [id]);

  if (!currentOrder) return <div>Loading...</div>;

  const buyer = currentOrder.buyer;
  const seller = currentOrder.order_items?.[0]?.product?.seller;
  const pickup = currentOrder.order_items?.[0]?.product?.apmc;
  const payment = currentOrder.payment;

  const formatAddress = (address) => {
    if (!address) return "N/A";
    const { name, area, village, taluka, city, state, pincode } = address;
    return [name, area, village, taluka, city, state, pincode].filter(Boolean).join(", ");
  };

  return (
    <Container>
      <SimpleCard title={`Order Details`}>
        <Grid container spacing={3}>
          {/* Buyer and Seller Info */}
          <Grid item xs={12} md={6}>
            <Typography><strong>Buyer:</strong> {buyer?.first_name || buyer?.name || "N/A"} {buyer?.last_name || ""}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography><strong>Seller:</strong> {seller?.first_name || seller?.name || "N/A"} {seller?.last_name || ""}</Typography>
          </Grid>

          {/* Order & Payment Info */}
          <Grid item xs={12} md={6}>
            <Typography><strong>Total Amount:</strong> ₹{Number(currentOrder.total_amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography><strong>Status:</strong> {currentOrder.order_status}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography><strong>Payment Method:</strong> {payment?.payment_method || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography><strong>Payment Status:</strong> {payment?.payment_status || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography><strong>Paid Amount:</strong> ₹{Number(payment?.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography><strong>Payment Date:</strong> {payment?.paid_at || "N/A"}</Typography>
          </Grid>

          {/* Address Info */}
          <Grid item xs={12}>
            <Typography><strong>Pickup Address:</strong> {formatAddress(pickup)}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography><strong>Shipping Address:</strong> {currentOrder.shipping_address}</Typography>
          </Grid>

          {/* Back Button */}
          <Grid item xs={12}>
            <Box mt={2}>
              <Button variant="contained" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Box>
          </Grid>
        </Grid>
      </SimpleCard>
    </Container>
  );
}
