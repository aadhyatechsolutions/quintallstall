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
import React, { useState, useEffect } from "react";
import { SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import usePlatformCommissionStore from "../../store/commission/platformCommissionStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function PlatformCommission() {
  const navigate = useNavigate();
  const { addPlatformCommission, fetchPlatformCommission, platformCommission } = usePlatformCommissionStore();

  const [formData, setFormData] = useState({
    platform_price: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchPlatformCommission();
  }, [fetchPlatformCommission]);
  
  useEffect(() => {
    if (platformCommission) {
      setFormData({ platform_price: platformCommission.platform_price.toString() });
    }
  }, [platformCommission]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPlatformCommission(formData);
      setSnackbar({
        open: true,
        message: "Platform Commission created successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/commissions/platform-commission"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to create platform commission",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <SimpleCard title="Create Platform Commission">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Platform Price */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Platform Price"
                name="platform_price"
                type="number"
                value={formData.platform_price}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Icon>save</Icon>}
                disabled={!formData.platform_price} // disable if empty
              >
                Save Platform Commission
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
