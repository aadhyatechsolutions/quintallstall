import React, { useEffect } from "react";
import { Box, Typography, Grid, Button, styled } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { SimpleCard } from "app/components";
import useVehicleTypeStore from "../../store/vehicleType/vehicleTypeStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function VehicleTypeDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchVehicleTypeById, currentVehicleType } = useVehicleTypeStore();

  useEffect(() => {
    fetchVehicleTypeById(id);
  }, [id]);

  if (!currentVehicleType) return <div>Loading...</div>;

  const { type, loading_capacity } = currentVehicleType;

  return (
    <Container>
      <SimpleCard title={`Vehicle Type #${id}`}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Type:</strong> {type || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Loading Capacity:</strong> {loading_capacity} kg
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
