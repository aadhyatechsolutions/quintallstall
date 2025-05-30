import {
  Stack,
  Box,
  styled,
  Button,
  Icon,
  TextField,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import useVehicleTypeStore from "../../store/vehicleType/vehicleTypeStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function VehicleTypeCreate() {
  const navigate = useNavigate();
  const { addVehicleType } = useVehicleTypeStore();

  const [formData, setFormData] = useState({
    type: "",
    loading_capacity: "",
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

    try {
      await addVehicleType(formData); // Assuming async action
      setSnackbar({
        open: true,
        message: "Vehicle Type created successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/comissions/vehicle-type/list"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to create vehicle type",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <SimpleCard title="Create Vehicle Type">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Type */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Loading Capacity */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Loading Capacity"
                name="loading_capacity"
                type="number"
                value={formData.loading_capacity}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Submit */}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Icon>save</Icon>}
              >
                Save Vehicle Type
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}
