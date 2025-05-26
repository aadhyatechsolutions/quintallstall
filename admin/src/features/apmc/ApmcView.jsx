import {
  Box,
  Grid,
  Typography,
  Button,
  styled,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SimpleCard } from "app/components";
import useApmcStore from "../../store/apmc/apmcStore";
import { apiConfig } from "app/config";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function ViewApmc() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchApmcById, currentApmc } = useApmcStore();

  useEffect(() => {
    fetchApmcById(id);
  }, [id]);

  const renderRow = (label, value) => (
    <Grid item xs={12} md={6}>
      <Typography variant="body1">
        <strong>{label}:</strong> {value || "—"}
      </Typography>
    </Grid>
  );

  if (!currentApmc) return <div>Loading...</div>;

  return (
    <Container>
      <SimpleCard title="APMC Details">
        <Grid container spacing={3}>
          {renderRow("Name", currentApmc.name)}
          {renderRow("Location", currentApmc.location)}
          {renderRow("Area", currentApmc.area)}
          {renderRow("Village", currentApmc.village)}
          {renderRow("Taluka", currentApmc.taluka)}
          {renderRow("City", currentApmc.city)}
          {renderRow("State", currentApmc.state)}
          {renderRow("Pincode", currentApmc.pincode)}

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Image</Typography>
            {currentApmc.image && (
              <img
                src={`${apiConfig.MEDIA_URL}${currentApmc.image}`}
                alt="APMC"
                style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Box>
          </Grid>
        </Grid>
      </SimpleCard>
    </Container>
  );
}
