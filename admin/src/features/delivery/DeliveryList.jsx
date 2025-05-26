import { Box, styled, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb, SimpleCard } from "app/components";
import useUserStore from "../../store/user/userStore"; 
import { useNavigate } from "react-router-dom";
import {apiConfig} from 'app/config';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function deliveryView() {
  const { users, loading, error, fetchUsersByRoles, deleteUser } = useUserStore();
  const navigate = useNavigate();

  
  useEffect(() => {
    fetchUsersByRoles(["delivery"]);
  }, [fetchUsersByRoles]);

  const handleDelete = (id) => {
    
    if (window.confirm("Are you sure you want to delete this delivery?")) {
      deleteUser(id);
    }
  };

  const handleEdit = (id) => {
    navigate(`/features/delivery/edit/${id}`); 
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "first_name", headerName: "First Name", width: 250 },
    { field: "last_name", headerName: "Last Name", width: 250 },
    { field: "business_name", headerName: "Business Name", width: 250 }, 
    { field: "email", headerName: "Email", width: 300 },
    { field: "phone_number", headerName: "Phone Number", width: 180 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: 'profile_image',
      headerName: 'Profile Image',
      width: 200,
      renderCell: (params) => (
        <img src={`${apiConfig.MEDIA_URL}${params.value}`} alt="Profile Image" style={{ width: 50, height: 50, objectFit: 'cover' }} />
      ),
    },
    { field: "address", headerName: "Address", width: 300 }, 
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
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

  const rows = users.map((user) => ({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    business_name: user.business_name || "N/A", 
    email: user.email,
    phone_number: user.phone_number || "N/A", 
    role: user.roles.map(role => role.name).join(", "), 
    profile_image: user.profile_image || "No Image", 
    address: [user.address?.street, user.address?.city, user.address?.state, user.address?.zip].filter(Boolean).join(" ") || "No Address",
  }));

  if (error) {
    return (
      <Container>
        <div>{error}</div>
      </Container>
    );
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "User Management", path: "/delivery/view" },
            { name: "Delivery View" },
          ]}
        />
      </Box>

      <SimpleCard title="Delivery Users">
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
