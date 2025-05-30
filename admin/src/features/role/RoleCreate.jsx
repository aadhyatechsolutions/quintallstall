import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    Icon,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
    styled,
    Alert,
  } from "@mui/material";
  import React, { useState } from "react";
  import { Breadcrumb, SimpleCard } from "app/components";
  import { useNavigate } from "react-router-dom";
  import useRoleStore from "../../store/role/roleStore"; // Your role store
  
  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  
  const predefinedPermissions = [
    "products",
    "orders",
    "wholesaler",
    "retailer",
    'delivery',
    "commissions",
    "frontend",
    "settings",
    "coin",
    "wallet",
  ];
  
  export default function CreateRole() {
    const navigate = useNavigate();
    const { createRole, error:roleError } = useRoleStore(); // Assuming this action posts the data
  
    const [formData, setFormData] = useState({
      name: "",
      slug: "",
      description: "",
      permissions: [],
    });
  
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handlePermissionToggle = (permission) => {
      setFormData((prev) => {
        const current = prev.permissions.includes(permission);
        const updatedPermissions = current
          ? prev.permissions.filter((p) => p !== permission)
          : [...prev.permissions, permission];
        return { ...prev, permissions: updatedPermissions };
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createRole(formData); 
        if(!roleError){
            setSnackbar({
                open: true,
                message: "Role created successfully!",
                severity: "success",
              });
              setTimeout(() => navigate("/settings/role/list"), 1500);
        }else{
            setSnackbar({
                open: true,
                message: userError,
                severity: "error",
            });
        }
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "Failed to create role",
          severity: "error",
        });
      }
    };
  
    return (
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Role Management", path: "/features/roles/view" },
              { name: "Create Role" },
            ]}
          />
        </Box>
  
        <SimpleCard title="Create Role">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Role Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Role Slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Role Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={3}
                />
                </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Select Permissions
                </Typography>
                <Grid container spacing={2}>
                  {predefinedPermissions.map((permission) => (
                    <Grid item xs={12} sm={4} key={permission}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.permissions.includes(permission)}
                            onChange={() => handlePermissionToggle(permission)}
                          />
                        }
                        label={permission.replace(/_/g, " ").toUpperCase()}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
  
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<Icon>save</Icon>}
                >
                  Save Role
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </SimpleCard>
  
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Container>
    );
  }
  