import React, { useState } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addStaff } from "../../../../redux/staffSlice"; // Import the addStaff action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function CreateStaff() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    contactNumber: "",
    email: "",
    profileImage: "",
    status: "Unblock", // Default status
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newStaff = {
      ...state,
    };

    dispatch(addStaff(newStaff)); // Add the new staff to the Redux store

    // Reset the form state
    setState({
      name: "",
      contactNumber: "",
      email: "",
      profileImage: "",
      status: "Unblock", // Default status
    });

    navigate("/settings/staff/view"); // Redirect to the staff list page after submit
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { name, contactNumber, email, profileImage, status } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Staff", path: "/staff/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Staff">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Staff Name Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  label="Staff Name"
                  required
                />
              </Grid>

              {/* Contact Number Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="contactNumber"
                  value={contactNumber}
                  onChange={handleChange}
                  label="Contact Number"
                  required
                />
              </Grid>

              {/* Email Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  label="Email"
                  required
                />
              </Grid>

              {/* Profile Image Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="profileImage"
                  value={profileImage}
                  onChange={handleChange}
                  label="Profile Image URL"
                />
              </Grid>

              {/* Status Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  name="status"
                  value={status}
                  onChange={handleChange}
                  label="Status"
                  required
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="Unblock">Unblock</option>
                  <option value="Block">Block</option>
                </TextField>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Button color="primary" variant="contained" type="submit" sx={{ mt: 3 }}>
              <Icon>send</Icon>
              <span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</span>
            </Button>
          </form>
        </SimpleCard>
      </Stack>
    </Container>
  );
}
