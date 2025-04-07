import React, { useState } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, FormControl, InputLabel, Select, MenuItem, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addVehicleMaster } from "../../../../redux/vehicleMasterSlice"; // Import the correct slice action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function VehicleMasterCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local state to hold form data
  const [state, setState] = useState({
    name: "",
    loadingCapacity: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare new vehicle master data
    const newVehicleMaster = { 
      ...state, 
      id: Date.now(), 
      srNo: Date.now(), // Generate unique id and srNo using timestamp
      action: ["Edit", "Delete"],
    };

    dispatch(addVehicleMaster(newVehicleMaster)); // Dispatch action to add the new vehicle master data

    // Clear the state
    setState({
      name: "",
      loadingCapacity: "",
    });

    // Redirect to view page
    navigate("/comissions/vehicle-master/view"); 
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { name, loadingCapacity } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Vehicle Master", path: "/comissions/vehicle-master/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Vehicle Master">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Name Field */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Vehicle Name</InputLabel>
                  <Select
                    name="name"
                    value={name}
                    onChange={handleChange}
                    label="Vehicle Name"
                    required
                  >
                    <MenuItem value="">
                      <em>--- Select Vehicle Name ---</em>
                    </MenuItem>
                    <MenuItem value="Truck">Truck</MenuItem>
                    <MenuItem value="Van">Van</MenuItem>
                    <MenuItem value="Bus">Bus</MenuItem>
                    <MenuItem value="Cargo">Cargo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Loading Capacity Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="loadingCapacity"
                  value={loadingCapacity}
                  onChange={handleChange}
                  label="Loading Capacity"
                  required
                />
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
