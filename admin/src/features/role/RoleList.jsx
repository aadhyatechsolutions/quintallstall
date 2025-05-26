import { Box, styled, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb, SimpleCard } from "app/components";
import useRoleStore from "../../store/role/roleStore";
import { useNavigate } from "react-router-dom";
import { apiConfig } from 'app/config';
import { Description } from "@mui/icons-material";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function RoleView() {
  const { roles, loading, error, fetchRoles, deleteRole } = useRoleStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleDelete = (id) => {
    deleteRole(id);
  };
  const handleView = (id) => {
    navigate(`/settings/role/view/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/settings/role/edit/${id}`);
  };

  const handlePermissionsChange = (e, roleId) => {
    const updatedPermissions = e.target.value.split(',').map(permission => permission.trim());
    // Call an API to update the permissions of the role (you can implement the API logic)
    // Example: updateRolePermissions(roleId, updatedPermissions)
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Role Name", width: 250 },
    { field: "slug", headerName: "Role Slug", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "permissions",
      headerName: "Permissions",
      width: 300,
      renderCell: (params) => (
        <TextField
          value={params.value.join(", ")} 
          onChange={(e) => handlePermissionsChange(e, params.row.id)}
          variant="outlined"
          fullWidth
        />
      ),
    },
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

  const rows = roles.map((role) => ({
    id: role.id,
    name: role.name,
    slug: role.slug,
    description: role.description,
    permissions: Array.isArray(role.permissions)
    ? role.permissions
    : typeof role.permissions === "string"
    ? JSON.parse(role.permissions)
    : [], 
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
            { name: "Role Management", path: "/features/roles/view" },
            { name: "Role View" },
          ]}
        />
      </Box>

      <SimpleCard title="Role Management">
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
