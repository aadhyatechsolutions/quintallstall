import React, { useState, useEffect } from "react";
import {
  Box, Stack, Grid, Button, TextField, Select,
  MenuItem, FormControl, InputLabel, Typography, styled
} from "@mui/material";
import { SimpleCard, Breadcrumb } from "app/components";
import useCoinStore from "../../../store/coin/coinStore";
import useWalletStore from "../../../store/wallet/walletStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function MakeWallet() {
  // const [walletStatus, setWalletStatus] = useState("Inactive");
  const [showAddForm, setShowAddForm] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [selectedCoinId, setSelectedCoinId] = useState("");

  const { coins, fetchCoins, loading: coinsLoading } = useCoinStore();
  const { walletValue, addCoin, updateStatus, fetchWallet, wallet } = useWalletStore();

  useEffect(() => {
    fetchCoins();
    fetchWallet();
  }, [fetchCoins, fetchWallet]);

  const toggleWalletStatus = async () => {
    const newStatus = wallet?.status === "Active" ? "Inactive" : "Active";
    try {
      await updateStatus(newStatus);
      // setWalletStatus(newStatus);
    } catch (err) {
      console.error("Failed to update status:", err.message);
    }
  };

  const handleAddCoins = async (e) => {
    e.preventDefault();
    if (!selectedCoinId || isNaN(quantity) || quantity <= 0) return;

    try {
      await addCoin({ coin_id: selectedCoinId, quantity: Number(quantity) });
      setQuantity("");
      setSelectedCoinId("");
      await fetchWallet();
    } catch (error) {
      console.error("Failed to add coin:", error.message);
    }
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Wallet", path: "/wallet/make-wallet" }, { name: "Overview" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Wallet">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Wallet Amount: ₹{walletValue}</Typography>
              <Typography variant="body1" color={wallet?.status === "Active" ? "green" : "red"}>
                Status: {wallet?.status}
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color={showAddForm ? "secondary" : "primary"}
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? "Cancel" : "Add Coins"}
              </Button>
              <Button
                variant="outlined"
                color={wallet?.status === "Active" ? "error" : "success"}
                onClick={toggleWalletStatus}
                sx={{ ml: 2 }}
              >
                {wallet?.status === "Active" ? "Deactivate" : "Activate"}
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
                      {coinsLoading ? (
                        <MenuItem disabled>Loading...</MenuItem>
                      ) : coins.length ? (
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
        </SimpleCard>
      </Stack>
    </Container>
  );
}
