import React, { useState } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, FormControl, InputLabel, Select, MenuItem, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addComissionMaster } from "../../../../redux/comissionMasterSlice"; // Assuming you will have this slice

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function ComissionMasterCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    vehicleType: "",
    bFarePerKg: "",
    vFarePerKg: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newComissionMaster = { ...state, id: Date.now(), srNo: Date.now() }; // id and srNo can be generated like this

    dispatch(addComissionMaster(newComissionMaster)); // Add to the store

    setState({
      vehicleType: "",
      bFarePerKg: "",
      vFarePerKg: "",
    });

    navigate("/comissions/comission-master/view"); // Redirect after submit
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { vehicleType, bFarePerKg, vFarePerKg } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Comission Master", path: "/comissions/comission-master/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Comission Master">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Vehicle Type Field */}
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
                      <em>--- Select Vehicle Type ---</em>
                    </MenuItem>
                    <MenuItem value="3 Wheeler - Rickshaw">3 Wheeler - Rickshaw</MenuItem>
                    <MenuItem value="3 Wheeler - Camper">3 Wheeler - Camper</MenuItem>
                    <MenuItem value="Tata Ace">Tata Ace</MenuItem>
                    <MenuItem value="Bolero Pick-up - 1">Bolero Pick-up - 1</MenuItem>
                    <MenuItem value="Bolero Pick-up - 2">Bolero Pick-up - 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* B Fare Per Kg Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="number"
                  name="bFarePerKg"
                  value={bFarePerKg}
                  onChange={handleChange}
                  label="B. Fare / KG"
                  required
                />
              </Grid>

              {/* V Fare Per Kg Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="number"
                  name="vFarePerKg"
                  value={vFarePerKg}
                  onChange={handleChange}
                  label="V. Fare / KG"
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
