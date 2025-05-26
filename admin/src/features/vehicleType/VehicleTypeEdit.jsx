import {
  Box,
  styled,
  Button,
  Icon,
  TextField,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { SimpleCard } from "app/components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useVehicleTypeStore from "../../store/vehicleType/vehicleTypeStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function VehicleTypeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchVehicleTypeById, updateVehicleType } = useVehicleTypeStore();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    type: "",
    loading_capacity: "",
  });

  useEffect(() => {
    const loadVehicleType = async () => {
      try {
        const data = await fetchVehicleTypeById(id);
        setFormData({
          type: data.type || "",
          loading_capacity: data.loading_capacity || "",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to load vehicle type data.",
          severity: "error",
        });
      }
    };

    loadVehicleType();
  }, [id, fetchVehicleTypeById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateVehicleType({ ...formData, _method: "put" }, id);
      setSnackbar({
        open: true,
        message: "Vehicle type updated successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/comissions/vehicle-type/list"), 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update vehicle type",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <SimpleCard title="Edit Vehicle Type">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Vehicle Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Loading Capacity"
                name="loading_capacity"
                value={formData.loading_capacity}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Icon>save</Icon>}
              >
                Save Changes
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
