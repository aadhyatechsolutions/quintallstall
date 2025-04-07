import React, { useState, useEffect } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editStaff } from "../../../../redux/staffSlice"; // Import the edit action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function EditStaff() {
  const { id } = useParams(); // Get staff ID from URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    srNo: "",
    name: "",
    contactNumber: "",
    email: "",
    profileImage: "",
    status: "Unblock", // Default status
  });

  // Get staff data from Redux store
  const staff = useSelector((state) => state.staff.data);

  // Find the specific staff data by srNo (id in params)
  const staffData = staff.find((item) => item.srNo == parseInt(id));

  useEffect(() => {
    // If staff data is found, set it into state
    if (staffData) {
      setState({
        srNo: staffData.srNo,
        name: staffData.name,
        contactNumber: staffData.contactNumber,
        email: staffData.email,
        profileImage: staffData.profileImage,
        status: staffData.status,
      });
    }
  }, [staffData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an updated staff object and dispatch it to Redux
    const updatedStaff = { ...state };

    dispatch(editStaff(updatedStaff));

    setState({
      name: "",
      contactNumber: "",
      email: "",
      profileImage: "",
      status: "Unblock", // Reset status
    });

    navigate("/settings/staff/view"); // Navigate to the staff list after editing
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { name, contactNumber, email, profileImage, status } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Staff", path: "/staff/view" }, { name: "Edit" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Edit Staff">
          {staffData ? (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Name Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    name="name"
                    value={name || ""}
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
                    value={contactNumber || ""}
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
                    value={email || ""}
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
                    value={profileImage || ""}
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
                    value={status || "Unblock"}
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
          ) : (
            <p>Loading...</p>
          )}
        </SimpleCard>
      </Stack>
    </Container>
  );
}
