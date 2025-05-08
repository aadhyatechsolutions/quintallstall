import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  styled,
} from "@mui/material";
import { SimpleCard, Breadcrumb } from "app/components";
import useCoinStore from "../../../store/coin/coinStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function MakeWallet() {
  const [walletStatus, setWalletStatus] = useState("Inactive");
  const [walletAmount, setWalletAmount] = useState(500);
  const [showAddForm, setShowAddForm] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("");

  const { coins, fetchCoins, loading } = useCoinStore();

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const toggleWalletStatus = () => {
    setWalletStatus(walletStatus === "Active" ? "Inactive" : "Active");
  };

  const handleAddMoney = (e) => {
    e.preventDefault();
    if (quantity && !isNaN(quantity)) {
      // Simulated logic: could also calculate value based on coin rate
      setWalletAmount((prev) => prev + parseFloat(quantity));
      setQuantity("");
      setSelectedCoin("");
      setShowAddForm(false);
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
              <Typography variant="h6">Wallet Amount: ₹{walletAmount}</Typography>
              <Typography variant="body1" color={walletStatus === "Active" ? "green" : "red"}>
                Status: {walletStatus}
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
                color={walletStatus === "Active" ? "error" : "success"}
                onClick={toggleWalletStatus}
                sx={{ ml: 2 }}
              >
                {walletStatus === "Active" ? "Deactivate" : "Activate"}
              </Button>
            </Grid>
          </Grid>

          {showAddForm && (
            <Box component="form" onSubmit={handleAddMoney} mt={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Coin</InputLabel>
                    <Select
                      value={selectedCoin}
                      label="Coin"
                      onChange={(e) => setSelectedCoin(e.target.value)}
                    >
                      {loading ? (
                        <MenuItem disabled>Loading...</MenuItem>
                      ) : coins.length ? (
                        coins
                          .filter((coin) => coin.status?.toLowerCase() === "active")
                          .map((coin) => (
                            <MenuItem key={coin.id} value={coin.name}>
                              {coin.name}
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
