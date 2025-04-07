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
import { addRetailerUser } from '../../../../redux/retailerUserSlice';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function CreateRetailerUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    profileImage: null,
    address: "",
    pincode: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRetailerUser = { ...state, id: Date.now(), srNo: Date.now() }; // id and srNo can be generated like this

    dispatch(addRetailerUser(newRetailerUser));

    setState({
      name: "",
      email: "",
      password: "",
      phoneNo: "",
      profileImage: null,
      address: "",
      pincode: "",
    });

    navigate("/retailer/retailer-user/view");
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setState({ ...state, profileImage: event.target.files[0] });
  };

  const { name, email, password, phoneNo, address, pincode, profileImage } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "retailer User", path: "/retailer/retailer-user/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="retailer Create">
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

              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="phoneNo"
                  value={phoneNo}
                  onChange={handleChange}
                  label="Phone No"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="address"
                  value={address}
                  onChange={handleChange}
                  label="Address"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={3}>
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
            </Grid>

            {/* Profile Image Upload Section */}
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
                      color: profileImage ? "green" : "default",
                    }}
                  >
                    {profileImage ? "Image Selected" : "Choose Profile Image"}
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
