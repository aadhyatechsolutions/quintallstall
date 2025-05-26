import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, styled } from "@mui/material";
import { SimpleCard } from "app/components";

import usePurchaseCoinStore from "../../store/purchaseCoin/purchaseCoinStore";
import { format } from "date-fns";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function PurchasedCoinDetails() {
  const { id } = useParams();
  const { allPurchasedCoins, fetchAllPurchasedCoins, loading, error } = usePurchaseCoinStore();

  useEffect(() => {
    fetchAllPurchasedCoins();
  }, [fetchAllPurchasedCoins]);

  const purchasedCoin = allPurchasedCoins.find((pc) => pc.coin.id === parseInt(id));

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!purchasedCoin) return <Typography>Purchased Coin not found</Typography>;

  const {
    coin,
    quantity,
    user,
    created_at
  } = purchasedCoin;

  return (
    <Container>
      <SimpleCard title="Purchased Coin Details">
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6"><strong>ID:</strong> {coin.id}</Typography>
          <Typography variant="h6"><strong>Coin Type:</strong> {coin.name}</Typography>
          <Typography variant="h6"><strong>Coin Value:</strong> {coin.value}</Typography>
          <Typography variant="h6"><strong>Quantity:</strong> {quantity}</Typography>
          <Typography variant="h6"><strong>Total Value:</strong> {coin.value * quantity}</Typography>
          <Typography variant="h6"><strong>Purchased By:</strong> {user ? `${user.first_name} ${user.last_name}` : "Unknown"}</Typography>
          <Typography variant="h6">
            <strong>Purchase Date:</strong>{" "}
            {created_at ? format(new Date(created_at), "dd/MM/yyyy") : "N/A"}
          </Typography>
        </Box>
      </SimpleCard>
    </Container>
  );
}
