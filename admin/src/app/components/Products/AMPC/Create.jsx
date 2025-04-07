import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useState } from "react";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAmpc, addAmpcData } from '../../../../redux/ampcSlice.js';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function CreateAMPC() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    location: "",
    area: "",
    village: "",
    taluka: "",
    city: "",
    states: "",
    pincode: "",
    file: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newAmpc = { ...state };
    dispatch(addAmpcData(newAmpc));

    setState({
      name: "",
      location: "",
      area: "",
      village: "",
      taluka: "",
      city: "",
      states: "",
      pincode: "",
      file: null,
    });

    navigate("/products/ampc/view");
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setState({ ...state, file: event.target.files[0] });
  };

  const { name, location, area, village, taluka, city, states, pincode, file } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "AMPC", path: "/products/ampc/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="AMPC Create">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
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

              <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="text"
                    name="location"
                    value={location}
                    onChange={handleChange}
                    label="Location"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="text"
                    name="area"
                    value={area}
                    onChange={handleChange}
                    label="Area"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="text"
                    name="village"
                    value={village}
                    onChange={handleChange}
                    label="Village"
                    required
                  />
                </Grid>
              </Grid>

              {/* Second Row for remaining fields */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="text"
                    name="taluka"
                    value={taluka}
                    onChange={handleChange}
                    label="Taluka"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleChange}
                    label="City"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="text"
                    name="states"
                    value={states}
                    onChange={handleChange}
                    label="State"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="text"
                    name="pincode"
                    value={pincode}
                    onChange={handleChange}
                    label="Pincode"
                    required
                  />
                </Grid>
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
                      color: file ? "green" : "default",
                    }}
                  >
                    {file ? "Image Selected" : "Choose Image"}
                  </Button>
                </label>
              </Grid>
            </Grid>

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
