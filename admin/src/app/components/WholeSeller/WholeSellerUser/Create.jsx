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
import { addWholeSellerUser } from '../../../../redux/wholeSellerUserSlice';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function CreateWholeSellerUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    email: "",
    phoneNo: "",
    profileImage: null,
    ampc: "",
    address: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newWholeSellerUser = { ...state, id: Date.now(), srNo: Date.now() }; // id and srNo can be generated like this

    dispatch(addWholeSellerUser(newWholeSellerUser));

    setState({
      name: "",
      email: "",
      phoneNo: "",
      profileImage: null,
      ampc: "",
      address: "",
    });

    navigate("/wholeseller/wholeseller-user/view");
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setState({ ...state, profileImage: event.target.files[0] });
  };

  const { name, email, phoneNo, ampc, address, profileImage } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "WholeSeller User", path: "/wholeseller/wholeseller-user/view" }, { name: "create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="WholeSeller Create">
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
                  label="Email"
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
                  name="ampc"
                  value={ampc}
                  onChange={handleChange}
                  label="AMPC"
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
