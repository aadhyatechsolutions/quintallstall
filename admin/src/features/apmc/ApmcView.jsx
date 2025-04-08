import { Box, styled, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb, SimpleCard } from "app/components";
import useApmcStore from "../../store/apmc/apmcStore"; // Importing apmc store
import { useNavigate } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function ApmcView() {
  const { apmcs, loading, error, fetchApmcs, deleteApmc } = useApmcStore(); // Use apmc store
  const navigate = useNavigate();

  useEffect(() => {
    fetchApmcs(); // Fetch APMCs when the component mounts
  }, [fetchApmcs]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this APMC?")) {
      deleteApmc(id); // Delete the APMC after confirmation
    }
  };

  const handleEdit = (id) => {
    navigate(`/features/apmc/edit/${id}`); // Navigate to edit page for selected APMC
  };

  // Defining columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "APMC Name", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "area", headerName: "Area", width: 150 },
    { field: "village", headerName: "Village", width: 150 },
    { field: "taluka", headerName: "Taluka", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "pincode", headerName: "Pincode", width: 150 },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="APMC" style={{ width: 50, height: 50, objectFit: 'cover' }} />
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

  // Mapping the fetched APMCs into rows format expected by the DataGrid
  const rows = apmcs.map((apmc) => ({
    id: apmc.id,
    name: apmc.name,
    location: apmc.location,
    area: apmc.area,
    village: apmc.village,
    taluka: apmc.taluka,
    city: apmc.city,
    state: apmc.state,
    pincode: apmc.pincode,
    image: apmc.image,
  }));

  if (error) {
    return <div>{error}</div>; // Show error message if there's an issue fetching data
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "APMC Master", path: "/features/apmc/view" },
            { name: "View" },
          ]}
        />
      </Box>

      <SimpleCard title="APMC Master List">
        {loading ? (
          <div>Loading...</div> // Show loading message while data is being fetched
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
