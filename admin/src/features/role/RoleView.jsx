import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, styled, Grid, Button } from "@mui/material";
import { SimpleCard } from "app/components";
import useRoleStore from "../../store/role/roleStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function RoleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { roles, fetchRoles, loading, error } = useRoleStore();

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const role = roles.find((r) => r.id === parseInt(id));

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!role) return <Typography>Role not found</Typography>;

  // Parse permissions safely in case stored as string or array
  let permissions = [];
  if (Array.isArray(role.permissions)) {
    permissions = role.permissions;
  } else if (typeof role.permissions === "string") {
    try {
      permissions = JSON.parse(role.permissions);
    } catch {
      permissions = [];
    }
  }

  return (
    <Container>
      <SimpleCard title="Role Details">
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography ><strong>ID:</strong> {role.id}</Typography>
          <Typography ><strong>Name:</strong> {role.name}</Typography>
          <Typography ><strong>Slug:</strong> {role.slug}</Typography>
          <Typography ><strong>Description:</strong> {role.description || "N/A"}</Typography>
          <Typography >
            <strong>Permissions:</strong> {permissions.length > 0 ? permissions.join(", ") : "None"}
          </Typography>
        </Box>
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
