import { Box, styled, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; 
import { Breadcrumb, SimpleCard } from "app/components";
import useCoinStore from "../../store/coin/coinStore";  // Updated to coin store
import { useNavigate } from "react-router-dom"; 
import { apiConfig } from 'app/config';  // Assuming your API config is set for media

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function CoinView() {
  const { coins, loading, error, fetchCoins, deleteCoin, updateCoinStatus } = useCoinStore();  // Using coin store
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const handleDelete = (id) => {
    deleteCoin(id);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateCoinStatus(id, newStatus);
      // fetchCoins(); // Optional, you could refetch after updating
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/settings/coin-settings/edit/${id}`);  // Route for coin editing
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Coin Name", width: 200 },
    { field: "slug", headerName: "Slug", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "value", headerName: "Value", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleToggleStatus(params.row.id, params.row.status)}
          style={{
            backgroundColor: params.value === "active" ? "green" : "red",
            color: "white",
            textTransform: "capitalize",
          }}
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const rows = coins.map((coin) => ({
    id: coin.id,
    name: coin.name,
    slug: coin.slug,
    description: coin.description,
    value: coin.value,
    status: coin.status,
  }));

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Coin Master", path: "/coins/coin-master/view" }, { name: "View" }]} />
      </Box>

      <SimpleCard title="Coin Master List">
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
