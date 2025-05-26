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
import { apiConfig } from "app/config";
import useUserStore from "../../store/user/userStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function DeliveryViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchUserById, currentUser } = useUserStore();

  useEffect(() => {
    fetchUserById(id);
  }, [id]);

  const renderRow = (label, value) => (
    <Grid item xs={12} md={6}>
      <Typography variant="body1">
        <strong>{label}:</strong> {value || "—"}
      </Typography>
    </Grid>
  );

  if (!currentUser) return <div>Loading...</div>;

  const fullName = `${currentUser.first_name || ""} ${currentUser.last_name || ""}`;
  const address = [
    currentUser.address?.street,
    currentUser.address?.city,
    currentUser.address?.state,
    currentUser.address?.zip,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Container>
      <SimpleCard title="Delivery User Details">
        <Grid container spacing={3}>
          {renderRow("Full Name", fullName)}
          {renderRow("Business Name", currentUser.business_name)}
          {renderRow("Email", currentUser.email)}
          {renderRow("Phone Number", currentUser.phone_number)}
          {renderRow("Role", currentUser.roles?.map((r) => r.name).join(", "))}
          {renderRow("Address", address)}

          {/* Profile Image */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Profile Image
            </Typography>
            {currentUser.profile_image ? (
              <img
                src={`${apiConfig.MEDIA_URL}${currentUser.profile_image}`}
                alt="Profile"
                style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
              />
            ) : (
              <Typography variant="body2">No Image</Typography>
            )}
          </Grid>

          {/* Back Button */}
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
