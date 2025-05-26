import { Box, styled, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SimpleCard } from "app/components";
import useVehicleTypeStore from "../../store/vehicleType/vehicleTypeStore";
import { useNavigate } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function VehicleTypeView() {
  const {
    vehicleTypes,
    loading,
    error,
    fetchVehicleTypes,
    deleteVehicleType,
  } = useVehicleTypeStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicleTypes();
  }, [fetchVehicleTypes]);
  const handleView = (id) => {
    navigate(`/comissions/vehicle-type/view/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/comissions/vehicle-type/edit/${id}`);
  };

  const handleDelete = (id) => {
    deleteVehicleType(id);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "type", headerName: "Vehicle Type", width: 200 },
    {
      field: "loading_capacity",
      headerName: "Loading Capacity (kg)",
      width: 200,
    },
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

  const rows = vehicleTypes.map((vehicle) => ({
    id: vehicle.id,
    type: vehicle.type,
    loading_capacity: vehicle.loading_capacity,
  }));

  if (error) return <div>{error}</div>;

  return (
    <Container>
      <SimpleCard title="Vehicle Type List">
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
