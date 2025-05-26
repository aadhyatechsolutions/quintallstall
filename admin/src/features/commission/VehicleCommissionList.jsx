import { Box, styled, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SimpleCard } from "app/components";
import useVehicleCommissionStore from "../../store/commission/vehicleCommissionStore";
import { useNavigate } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function VehicleCommissionView() {
  const {
    vehicleCommissions,
    loading,
    error,
    fetchVehicleCommissions,
    deleteVehicleCommission,
  } = useVehicleCommissionStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicleCommissions();
  }, [fetchVehicleCommissions]);
  const handleView = (id) => {
    navigate(`/commissions/vehicle-commission/view/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/commissions/vehicle-commission/edit/${id}`);
  };

  const handleDelete = (id) => {
    deleteVehicleCommission(id);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "vehicle_type",
      headerName: "Vehicle Type",
      width: 200,
      valueGetter: (params) =>
        params.type || "Unknown",
    },
    { field: "v_fare", headerName: "Vehicle Fare", width: 150 },
    { field: "b_fare", headerName: "Broker Fare", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 225,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleView(params.row.id)}
            style={{ marginRight: 8 }}
          >
            View
          </Button>
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

  const rows = vehicleCommissions.map((commission) => ({
    id: commission.id,
    vehicle_type: commission.vehicle_type, // assuming this is the nested object with .type
    v_fare: commission.v_fare,
    b_fare: commission.b_fare,
  }));

  if (error) return <div>{error}</div>;

  return (
    <Container>
      <SimpleCard title="Vehicle Commission List">
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
