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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import useVehicleCommissionStore from "../../store/commission/vehicleCommissionStore";
import useVehicleTypeStore from "../../store/vehicleType/vehicleTypeStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function VehicleCommissionCreate() {
  const navigate = useNavigate();
  const { addVehicleCommission } = useVehicleCommissionStore();
  const { vehicleTypes, fetchVehicleTypes } = useVehicleTypeStore();

  const [formData, setFormData] = useState({
    vehicle_type_id: "",
    v_fare: "",
    b_fare: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchVehicleTypes();
  }, [fetchVehicleTypes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addVehicleCommission(formData);
      setSnackbar({
        open: true,
        message: "Vehicle Commission created successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/commissions/vehicle-commission/list"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to create vehicle commission",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <SimpleCard title="Create Vehicle Commission">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Vehicle Type Dropdown */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
                <Select
                  labelId="vehicle-type-label"
                  label="Vehicle Type"
                  name="vehicle_type_id"
                  value={formData.vehicle_type_id}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Select Vehicle Type</em>
                  </MenuItem>
                  {vehicleTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Vehicle Fare */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Vehicle Fare"
                name="v_fare"
                type="number"
                value={formData.v_fare}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Broker Fare */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Broker Fare"
                name="b_fare"
                type="number"
                value={formData.b_fare}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Icon>save</Icon>}
                disabled={!formData.vehicle_type_id} // disable submit if no vehicle type selected
              >
                Save Vehicle Commission
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
