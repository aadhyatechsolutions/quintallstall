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
import useWageCostCommissionStore from "../../store/commission/wageCostCommissionStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function WageCostCommission() {
  const navigate = useNavigate();
  const {
    addWageCostCommission,
    fetchWageCostCommission,
    wageCostCommission,
  } = useWageCostCommissionStore();

  const [formData, setFormData] = useState({
    cost: "",
    commission: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchWageCostCommission();
  }, [fetchWageCostCommission]);

  useEffect(() => {
    if (wageCostCommission) {
      setFormData({
        cost: wageCostCommission.cost.toString(),
        commission: wageCostCommission.commission.toString(),
      });
    }
  }, [wageCostCommission]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addWageCostCommission(formData);
      setSnackbar({
        open: true,
        message: "Wage Cost Commission saved successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/commissions/wage-cost-commission"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to save wage cost commission",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <SimpleCard title="Create Wage Cost Commission">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Cost */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cost"
                name="cost"
                type="number"
                value={formData.cost}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Commission */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Commission"
                name="commission"
                type="number"
                value={formData.commission}
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
                disabled={!formData.cost || !formData.commission} // disable if empty
              >
                Save Wage Cost Commission
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
