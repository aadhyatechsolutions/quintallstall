import { Stack, Box, styled, Button, Icon, TextField, Grid, Input, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editComissionMaster } from "../../../../redux/comissionMasterSlice"; // Import the edit action

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
    vehicleType: "",
    bFarePerKg: "",
    vFarePerKg: "",
  });

  // Assuming delivery master data is available in the Redux store
  const comissionMasters = useSelector((state) => state.comissionMaster.data);
  const comissionMasterData = comissionMasters.find((item) => item.srNo === parseInt(id));

  useEffect(() => {
    if (comissionMasterData) {
      setState({
        srNo:comissionMasterData.srNo,
        vehicleType: comissionMasterData.vehicleType,
        bFarePerKg: comissionMasterData.bFarePerKg,
        vFarePerKg: comissionMasterData.vFarePerKg,
      });
    }
  }, [comissionMasterData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedDeliveryMaster = { ...state };

    dispatch(editComissionMaster(updatedDeliveryMaster));

    setState({
      vehicleType: "",
      bFarePerKg: "",
      vFarePerKg: "",
    });

    navigate("/comissions/comission-master/view");
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { srNo, vehicleType, bFarePerKg, vFarePerKg, description, permitNumber, insuranceNumber } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Comission Master", path: "/comissions/comission-master/view" }, { name: "Edit" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Edit Delivery Master">
          {comissionMasterData ? (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* SR No Field */}

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
          ) : (
            <p>Loading...</p>
          )}
        </SimpleCard>
      </Stack>
    </Container>
  );
}
