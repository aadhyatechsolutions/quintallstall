import { Box, styled, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SimpleCard } from "app/components";
import usePurchaseCoinStore from "../../store/purchaseCoin/purchaseCoinStore";
import { format } from "date-fns";
import useAuth from "app/hooks/useAuth";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function PurchasedCoinsView() {
  const { allPurchasedCoins, fetchAllPurchasedCoins, error, loading } = usePurchaseCoinStore();
  const { user } = useAuth();
  useEffect(() => {
    fetchAllPurchasedCoins();
  }, [fetchAllPurchasedCoins]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "coin_type", headerName: "Coin Type", width: 150 },
    { field: "value", headerName: "Coin Value", width: 130 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "totalValue", headerName: "Total Value", width: 130 },
    { field: "purchased_by", headerName: "Purchased By", width: 180 },
    {
        field: "date",
        headerName: "Purchase Date",
        width: 180,
        valueFormatter: (params) => {
            const dateValue = params;
            if (!dateValue) return "N/A";

            const parsedDate = new Date(dateValue);
            return isNaN(parsedDate.getTime()) ? "Invalid Date" : format(parsedDate, "dd/MM/yyyy");
        },
        }
  ];
  const isAdmin = user?.roles?.some(role => role.slug === "admin");
  const filteredPurchasedCoins = isAdmin
    ? allPurchasedCoins
    : allPurchasedCoins.filter(coin => coin.user_id === user.id);

  const rows = filteredPurchasedCoins.map((purchasedCoin) => ({
    id: purchasedCoin.coin.id,
    coin_type: purchasedCoin.coin.name,
    value: purchasedCoin.coin.value,
    quantity: purchasedCoin.quantity,
    totalValue: purchasedCoin.coin.value * purchasedCoin.quantity,
    purchased_by: purchasedCoin?.user ? `${purchasedCoin.user.first_name} ${purchasedCoin.user.last_name}`.trim() : "Unknown",
    date: purchasedCoin.created_at,
  }));

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <SimpleCard title="Purchased Coins List">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            checkboxSelection
          />
        )}
      </SimpleCard>
    </Container>
  );
}
