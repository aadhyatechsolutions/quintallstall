import React, { useEffect } from "react";
import { Box, Typography, Grid, Button, styled } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { SimpleCard } from "app/components";
import useVehicleCommissionStore from "../../store/commission/vehicleCommissionStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function VehicleCommissionDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchVehicleCommissionById, currentVehicleCommission } = useVehicleCommissionStore();

  useEffect(() => {
    fetchVehicleCommissionById(id);
  }, [id]);

  if (!currentVehicleCommission) return <div>Loading...</div>;

  const { vehicle_type, v_fare, b_fare } = currentVehicleCommission;

  return (
    <Container>
      <SimpleCard title={`Vehicle Commission`}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Vehicle Type:</strong> {vehicle_type?.type || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Vehicle Fare:</strong> ₹{v_fare}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Broker Fare:</strong> ₹{b_fare}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box mt={2}>
              <Button variant="contained" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Box>
          </Grid>
        </Grid>
      </SimpleCard>
    </Container>
  );
}
