import React, { useState, useEffect } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, FormControl, InputLabel, Select, MenuItem, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editVehicleMaster } from "../../../../redux/vehicleMasterSlice"; // Import the edit action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    srNo: "",
    name: "",
    loadingCapacity: "",
  });

  // Assuming vehicle master data is available in the Redux store
  const vehicleMasters = useSelector((state) => state.vehicleMaster.data);
  
  // Find the specific vehicle master data by srNo (id in params)
  const vehicleMasterData = vehicleMasters.find((item) => item.srNo == parseInt(id));

  useEffect(() => {
    // If we have the vehicleMasterData, set it into the state
    if (vehicleMasterData) {
      setState({
        srNo: vehicleMasterData.srNo,
        name: vehicleMasterData.name,
        loadingCapacity: vehicleMasterData.loadingCapacity,
      });
    }
  }, [vehicleMasterData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an updated vehicle master object and dispatch it to Redux
    const updatedVehicleMaster = { ...state };

    dispatch(editVehicleMaster(updatedVehicleMaster));

    setState({
      name: "",
      loadingCapacity: "",
    });

    navigate("/comissions/vehicle-master/view"); // Navigate to the view page after editing
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { name, loadingCapacity } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Vehicle Master", path: "/comissions/vehicle-master/view" }, { name: "Edit" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Edit Vehicle Master">
          {vehicleMasterData ? (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Name Field */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Vehicle Name</InputLabel>
                    <Select
                      name="name"
                      value={name || ""}
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
                    value={loadingCapacity || ""}
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
          ) : (
            <p>Loading...</p>
          )}
        </SimpleCard>
      </Stack>
    </Container>
  );
}
