import React, { useState } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, Input, styled, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDeliveryUser } from "../../../../redux/deliveryUserSlice"; // Assuming you will have this slice

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function DeliveryUserCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    vehicleType: "",
    vehicleNo: "",
    image: null,
    description: "",
    accountNumber: "",
    ifscCode: "",
    cancelCheck: null,
    permitNumber: "",
    insuranceNumber: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newDeliveryUser = { ...state, id: Date.now(), srNo: Date.now() }; // id and srNo can be generated like this

    dispatch(addDeliveryUser(newDeliveryUser)); // Add to the store

    setState({
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      vehicleType: "",
      vehicleNo: "",
      image: null,
      description: "",
      accountNumber: "",
      ifscCode: "",
      cancelCheck: null,
      permitNumber: "",
      insuranceNumber: "",
    });

    navigate("/delivery/delivery-user/view"); // Redirect after submit
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setState({ ...state, image: event.target.files[0] });
  };

  const handleCancelCheckChange = (event) => {
    setState({ ...state, cancelCheck: event.target.files[0] });
  };

  const { name, email, password, contactNumber, vehicleType, vehicleNo, image, description, accountNumber, ifscCode, cancelCheck, permitNumber, insuranceNumber } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Delivery User", path: "/delivery/delivery-user/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Delivery User">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Name Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  label="Name"
                  required
                />
              </Grid>

              {/* Email Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  label="Email Id"
                  required
                />
              </Grid>

              {/* Password Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  label="Password"
                  required
                />
              </Grid>

              {/* Contact Number Field */}
              <Grid item xs={12} sm={3}>
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

              {/* Vehicle Type Field (Updated) */}
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel>Vehicle Type</InputLabel>
                  <Select
                    name="vehicleType"
                    value={vehicleType}
                    onChange={handleChange}
                    label="Vehicle Type"
                    required
                  >
                    <MenuItem value="">
                      <em>--- Vehicle Type ---</em>
                    </MenuItem>
                    <MenuItem value="1">3 Wheeler - Rickshaw</MenuItem>
                    <MenuItem value="2">3 Wheeler - Camper</MenuItem>
                    <MenuItem value="3">Tata Ace</MenuItem>
                    <MenuItem value="4">Bolero Pick-up - 1</MenuItem>
                    <MenuItem value="5">Bolero Pick-up - 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Vehicle No Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="vehicleNo"
                  value={vehicleNo}
                  onChange={handleChange}
                  label="Vehicle No"
                  required
                />
              </Grid>

              {/* Description Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  label="Description"
                  required
                />
              </Grid>

              {/* Account Number Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="accountNumber"
                  value={accountNumber}
                  onChange={handleChange}
                  label="Account Number"
                  required
                />
              </Grid>

              {/* IFSC Code Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="ifscCode"
                  value={ifscCode}
                  onChange={handleChange}
                  label="IFSC Code"
                  required
                />
              </Grid>

              {/* Permit Number Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="permitNumber"
                  value={permitNumber}
                  onChange={handleChange}
                  label="Permit Number"
                  required
                />
              </Grid>

              {/* Insurance Number Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="insuranceNumber"
                  value={insuranceNumber}
                  onChange={handleChange}
                  label="Insurance Number"
                  required
                />
              </Grid>
            </Grid>

            {/* Image Upload Section */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={3}>
                <Input
                  accept="image/*"
                  id="image-upload"
                  type="file"
                  onChange={handleFileChange}
                  fullWidth
                  sx={{
                    display: "none",
                  }}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="contained"
                    component="span"
                    fullWidth
                    sx={{
                      display: "block",
                      textTransform: "capitalize",
                      color: image ? "green" : "default",
                    }}
                  >
                    {image ? "Image Selected" : "Choose Image"}
                  </Button>
                </label>
              </Grid>
            </Grid>

            {/* Cancel Check Upload Section */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={3}>
                <Input
                  accept="application/pdf"
                  id="cancel-check-upload"
                  type="file"
                  onChange={handleCancelCheckChange}
                  fullWidth
                  sx={{
                    display: "none",
                  }}
                />
                <label htmlFor="cancel-check-upload">
                  <Button
                    variant="contained"
                    component="span"
                    fullWidth
                    sx={{
                      display: "block",
                      textTransform: "capitalize",
                      color: cancelCheck ? "green" : "default",
                    }}
                  >
                    {cancelCheck ? "File Selected" : "Upload Cancel Check"}
                  </Button>
                </label>
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
