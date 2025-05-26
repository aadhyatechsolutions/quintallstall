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

export default function DeliveryUserView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchUserById, currentUser } = useUserStore();

  useEffect(() => {
    fetchUserById(id);
  }, [id]);

  if (!currentUser) return <div>Loading...</div>;

  const fullName = `${currentUser.first_name || ""} ${currentUser.last_name || ""}`;
  const address = [
    currentUser.address?.street,
    currentUser.address?.city,
    currentUser.address?.state,
    currentUser.address?.zip,
  ]
    .filter(Boolean)
    .join(", ") || "N/A";

  return (
    <Container>
      <SimpleCard title="Delivery User Details">
        <Grid container spacing={3}>
          {/* Basic Info */}
          <Grid item xs={12} md={6}>
            <Typography><strong>Full Name:</strong> {fullName}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography><strong>Business Name:</strong> {currentUser.business_name || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography><strong>Email:</strong> {currentUser.email}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography><strong>Phone Number:</strong> {currentUser.phone_number || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography><strong>Role:</strong> {currentUser.roles?.map(r => r.name).join(", ")}</Typography>
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <Typography><strong>Address:</strong> {address}</Typography>
          </Grid>

          {/* Bank Details */}
          <Grid item xs={12} md={6}>
            <Typography><strong>Account Number:</strong> {currentUser.bank_account?.account_number || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography><strong>IFSC Code:</strong> {currentUser.bank_account?.ifsc_code || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography><strong>Cancelled Cheque:</strong>{" "}
              {currentUser.bank_account?.cancel_cheque ? (
                <a
                  href={`${apiConfig.MEDIA_URL}${currentUser.bank_account.cancel_cheque}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              ) : "N/A"}
            </Typography>
          </Grid>

          {/* Profile Image */}
          <Grid item xs={12} md={6}>
            <Typography><strong>Profile Image:</strong></Typography>
            {currentUser.profile_image ? (
              <img
                src={`${apiConfig.MEDIA_URL}${currentUser.profile_image}`}
                alt="Profile"
                style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
              />
            ) : (
              <Typography>No Image</Typography>
            )}
          </Grid>

          {/* Back Button */}
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
