import React, { useState } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, FormControl, InputLabel, Select, MenuItem, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch } from "react-redux";
import { addSpecialOffer } from "../../../../redux/specialOfferSlice";
import { useNavigate } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function CreateSpecialOffer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    title: "",
    secondTitle: "",
    shortDec: "",
    image: "",
    shopButtonText: "",
    shopButtonLink: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new special offer object
    const newOffer = {
      ...state,
      srNo: Date.now(), // Assuming srNo is generated based on timestamp
    };

    dispatch(addSpecialOffer(newOffer));

    setState({
      title: "",
      secondTitle: "",
      shortDec: "",
      image: "",
      shopButtonText: "",
      shopButtonLink: "",
    });

    navigate("/frontend/special-offer/view"); // Navigate to the view page
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { title, secondTitle, shortDec, image, shopButtonText, shopButtonLink } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Special Offers", path: "/special-offers/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Special Offer">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Second Title"
                  name="secondTitle"
                  value={secondTitle}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Short Description"
                  name="shortDec"
                  value={shortDec}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={image}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Shop Button Text"
                  name="shopButtonText"
                  value={shopButtonText}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Shop Button Link"
                  name="shopButtonLink"
                  value={shopButtonLink}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>

            <Button type="submit" color="primary" variant="contained" sx={{ mt: 3 }}>
              <Icon>send</Icon>
              Submit
            </Button>
          </form>
        </SimpleCard>
      </Stack>
    </Container>
  );
}
