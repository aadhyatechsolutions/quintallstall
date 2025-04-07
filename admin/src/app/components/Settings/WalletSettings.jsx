import React, { useState, useEffect } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, MenuItem, Select, FormControl, InputLabel, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setWalletStatus } from "../../../redux/walletSlice"; // Your Redux action
import { useNavigate } from "react-router-dom";
import { SimpleCard } from "app/components";
import { Breadcrumb } from "app/components";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function MakeWallet() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the current wallet status from the Redux store
  const currentWalletStatus = useSelector((state) => state.wallet.status);

  const [walletStatus, setWalletStatusState] = useState(currentWalletStatus || "Inactive"); // Default to 'Inactive' if no value in Redux

  // Set the updated wallet status in state after Redux update
  useEffect(() => {
    setWalletStatusState(currentWalletStatus);
  }, [currentWalletStatus]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setWalletStatus(walletStatus)); // Dispatch the updated wallet status to Redux
    navigate("/settings/wallet-settings");  // Re-navigate to refresh the view
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Make Wallet", path: "/wallet/make-wallet" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Make Wallet">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Wallet Status Dropdown Field */}
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth required>
                  <InputLabel>Make Wallet</InputLabel>
                  <Select
                    value={walletStatus}
                    onChange={(e) => setWalletStatusState(e.target.value)}
                    label="Make Wallet"
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Button color="primary" variant="contained" type="submit" sx={{ mt: 3 }}>
              <Icon>send</Icon>
              <span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</span>
            </Button>
          </form>
        </SimpleCard>
      </Stack>
    </Container>
  );
}
