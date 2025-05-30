import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, styled, Grid, Button } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import useCoinStore from "../../store/coin/coinStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function CoinDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { coins, fetchCoins, loading, error } = useCoinStore();

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const coin = coins.find((c) => c.id === parseInt(id));

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Coin Master", path: "/coins/coin-master/view" },
            { name: "Details" },
          ]}
        />
      </Box>

      <SimpleCard title="Coin Details">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : !coin ? (
          <Typography>Coin not found</Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography ><strong>ID:</strong> {coin.id}</Typography>
            <Typography ><strong>Name:</strong> {coin.name}</Typography>
            <Typography ><strong>Slug:</strong> {coin.slug}</Typography>
            <Typography ><strong>Description:</strong> {coin.description || "N/A"}</Typography>
            <Typography ><strong>Value:</strong> {coin.value}</Typography>
            <Typography ><strong>Status:</strong> {coin.status}</Typography>
          </Box>
        )}
        <Grid item xs={12}>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Box>
        </Grid>
      </SimpleCard>
    </Container>
  );
}
