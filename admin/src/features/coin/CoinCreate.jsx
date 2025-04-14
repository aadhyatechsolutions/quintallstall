import {
    Stack,
    Box,
    styled,
    Button,
    Icon,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    Alert,
  } from "@mui/material";
  import React, { useEffect } from "react";
  import { Breadcrumb, SimpleCard } from "app/components";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import useCoinStore from "../../store/coin/coinStore";  // Using coin store
  import { apiConfig } from 'app/config';  // Assuming your API config is set for media
  
  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  
  export default function CoinCreate() {
    const navigate = useNavigate();
    const { addCoin } = useCoinStore();  // Using coin store
    const [formData, setFormData] = useState({
      name: "",
      slug: "",
      description: "",
      value: "",  
      status: "active",  // Default status
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
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      let data = new FormData();
      data = { ...formData };
  
      try {
        await addCoin(data);
  
        setSnackbar({
          open: true,
          message: "Coin created successfully!",
          severity: "success",
        });
  
        setTimeout(() => navigate("/settings/coin-settings/view"), 1500);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "Failed to create coin",
          severity: "error",
        });
      }
    };
  
    return (
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Coin Master", path: "/features/coin/view" },
              { name: "Create Coin" },
            ]}
          />
        </Box>
  
        <SimpleCard title="Create Coin">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Coin Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Value"
                  name="value"
                  type="number"
                  value={formData.value}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="Status"
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
  
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<Icon>save</Icon>}
                >
                  Save Coin
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
  