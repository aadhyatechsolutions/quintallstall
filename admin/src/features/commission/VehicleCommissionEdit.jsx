import {
  Box,
  styled,
  Button,
  Icon,
  TextField,
  Grid,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import { SimpleCard } from "app/components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useVehicleCommissionStore from "../../store/commission/vehicleCommissionStore";
import useVehicleTypeStore from "../../store/vehicleType/vehicleTypeStore"; // import vehicleType store

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function VehicleCommissionEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchVehicleCommissionById, updateVehicleCommission } = useVehicleCommissionStore();

  // VehicleType store hook to fetch all vehicle types
  const { vehicleTypes, fetchVehicleTypes } = useVehicleTypeStore();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    vehicle_type_id: "",
    v_fare: "",
    b_fare: "",
  });

  useEffect(() => {
    // fetch all vehicle types once when component loads
    fetchVehicleTypes();
  }, [fetchVehicleTypes]);

  useEffect(() => {
    const loadVehicleCommission = async () => {
      try {
        const data = await fetchVehicleCommissionById(id);
        setFormData({
          vehicle_type_id: data.vehicle_type_id || "",
          v_fare: data.v_fare || "",
          b_fare: data.b_fare || "",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to load vehicle commission data.",
          severity: "error",
        });
      }
    };

    loadVehicleCommission();
  }, [id, fetchVehicleCommissionById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateVehicleCommission({ ...formData, _method: "put" }, id);
      setSnackbar({
        open: true,
        message: "Vehicle commission updated successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/commissions/vehicle-commission/list"), 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update vehicle commission",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <SimpleCard title="Edit Vehicle Commission">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Vehicle Type Dropdown */}
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Vehicle Type"
                name="vehicle_type_id"
                value={formData.vehicle_type_id}
                onChange={handleChange}
                required
              >
                {vehicleTypes.map((vt) => (
                  <MenuItem key={vt.id} value={vt.id}>
                    {vt.type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Vehicle Fare */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Vehicle Fare"
                name="v_fare"
                value={formData.v_fare}
                onChange={handleChange}
                type="number"
                required
              />
            </Grid>

            {/* Broker Fare */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Broker Fare"
                name="b_fare"
                value={formData.b_fare}
                onChange={handleChange}
                type="number"
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
              >
                Save Changes
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
