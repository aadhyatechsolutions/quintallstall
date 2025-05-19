import React, { useState, useEffect } from "react";
import {
  Box, Stack, Grid, Button, TextField, Select,
  MenuItem, FormControl, InputLabel, Typography, styled
} from "@mui/material";
import { SimpleCard } from "app/components";
import useCoinStore from "../../store/coin/coinStore";
import usePurchaseCoinStore from "../../store/purchaseCoin/purchaseCoinStore";
import useWalletStore from "../../store/wallet/walletStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function PurchaseCoin() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [selectedCoinId, setSelectedCoinId] = useState("");

  const { coins, fetchCoins } = useCoinStore();
  const { purchaseCoins, fetchPurchaseCoins, addPurchaseCoin } = usePurchaseCoinStore();
  const { fetchWallet } = useWalletStore();

  useEffect(() => {
    fetchCoins();
    fetchPurchaseCoins();
    fetchWallet();
  }, []);

  const handleAddCoins = async (e) => {
    e.preventDefault();
    if (!selectedCoinId || isNaN(quantity) || quantity <= 0) return;

    try {
      await addPurchaseCoin({ coin_id: selectedCoinId, quantity: Number(quantity) });
      setQuantity("");
      setSelectedCoinId("");
      await fetchPurchaseCoins();
    } catch (error) {
      console.error("Failed to add purchase coin:", error.message);
    }
  };

  // Helper to find coin details
  const getCoinById = (id) => coins.find((coin) => coin.id === id);

  const totalCoinQuantity = purchaseCoins.reduce((sum, pCoin) => {
    const coin = getCoinById(pCoin.coin_id);
    const value = parseFloat(coin?.value || 0);
    return sum + pCoin.quantity;
  }, 0);

  return (
    <Container>
      <Stack spacing={3}>
        <SimpleCard >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Total Coins: {totalCoinQuantity}</Typography>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color={showAddForm ? "secondary" : "primary"}
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? "Cancel" : "Add Coins"}
              </Button>
            </Grid>
          </Grid>

          {showAddForm && (
            <Box component="form" onSubmit={handleAddCoins} mt={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Coin</InputLabel>
                    <Select
                      value={selectedCoinId}
                      label="Coin"
                      onChange={(e) => setSelectedCoinId(e.target.value)}
                    >
                      {coins.length ? (
                        coins
                          .filter((coin) => coin.status?.toLowerCase() === "active")
                          .map((coin) => (
                            <MenuItem key={coin.id} value={coin.id}>
                              {coin.name} (₹{coin.value})
                            </MenuItem>
                          ))
                      ) : (
                        <MenuItem disabled>No Coins Available</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Quantity"
                    fullWidth
                    type="number"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    inputProps={{ min: 1 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="secondary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>Purchased Coins:</Typography>
            {purchaseCoins.map((pCoin) => {
              const coin = getCoinById(pCoin.coin_id);
              return (
                <Box key={pCoin.id} display="flex" justifyContent="space-between" my={1}>
                  <Typography>{coin?.name || "Unknown Coin"} x {pCoin.quantity}</Typography>
                  <Typography>₹{(parseFloat(coin?.value || 0) * pCoin.quantity).toFixed(2)}</Typography>
                </Box>
              );
            })}
          </Box>
        </SimpleCard>
      </Stack>
    </Container>
  );
}
