import React, { useEffect } from "react";
import { Box, Typography, Grid, Button, Avatar, styled } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { SimpleCard } from "app/components";
import useUserStore from "../../store/user/userStore";
import { apiConfig } from "app/config";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function StaffDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, fetchUsersByRoles } = useUserStore();

  useEffect(() => {
    fetchUsersByRoles(["staff"]);
  }, [fetchUsersByRoles]);

  const staff = users.find((user) => user.id === parseInt(id));

  if (!staff) return <div>Loading...</div>;

  return (
    <Container>
      <SimpleCard title={`Staff Detail - ID #${staff.id}`}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>First Name:</strong> {staff.first_name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Last Name:</strong> {staff.last_name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Email:</strong> {staff.email}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Phone Number:</strong> {staff.phone_number || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Role(s):</strong>{" "}
              {staff.roles?.map((role) => role.name).join(", ") || "None"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Profile Image:</strong>
            </Typography>
            <Box mt={1}>
              <Avatar
                src={`${apiConfig.MEDIA_URL}${staff.profile_image}`}
                alt="Profile"
                sx={{ width: 80, height: 80 }}
              />
            </Box>
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
