import React, { useState, useEffect } from "react";
import { Stack, Box, styled, Button, Icon, TextField, Grid, Input, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editSpecialOffer } from "../../../../redux/specialOfferSlice"; // Import the edit action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function EditSpecialOffer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    srNo: "",
    title: "",
    secondTitle: "",
    shortDesc: "",
    image: null,
    shopButtonText: "",
    shopButtonLink: "",
  });

  // Assuming special offers are available in the Redux store
  const specialOffers = useSelector((state) => state.specialOffer.data);
  const specialOfferData = specialOffers.find((offer) => offer.srNo === parseInt(id));

  useEffect(() => {
    if (specialOfferData) {
      setState({
        srNo: specialOfferData.srNo,
        title: specialOfferData.title,
        secondTitle: specialOfferData.secondTitle,
        shortDesc: specialOfferData.shortDesc,
        image: specialOfferData.image, // Optional
        shopButtonText: specialOfferData.shopButtonText,
        shopButtonLink: specialOfferData.shopButtonLink,
      });
    }
  }, [specialOfferData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedSpecialOffer = { ...state };

    dispatch(editSpecialOffer(updatedSpecialOffer)); // Dispatch the edit action to update the special offer in Redux

    setState({
      srNo: "",
      title: "",
      secondTitle: "",
      shortDesc: "",
      image: null,
      shopButtonText: "",
      shopButtonLink: "",
    });

    navigate("/frontend/special-offer/view"); // Redirect to the view page after editing
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setState({ ...state, image: event.target.files[0] });
  };

  const { title, secondTitle, shortDesc, image, shopButtonText, shopButtonLink } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Special Offer", path: "/special-offer/view" }, { name: "Edit" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Edit Special Offer">
          {specialOfferData ? (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Title Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    label="Title"
                    required
                  />
                </Grid>

                {/* Second Title Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    name="secondTitle"
                    value={secondTitle}
                    onChange={handleChange}
                    label="Second Title"
                    required
                  />
                </Grid>

                {/* Short Description Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    name="shortDesc"
                    value={shortDesc}
                    onChange={handleChange}
                    label="Short Description"
                    required
                  />
                </Grid>

                {/* Shop Button Text Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    name="shopButtonText"
                    value={shopButtonText}
                    onChange={handleChange}
                    label="Shop Button Text"
                    required
                  />
                </Grid>

                {/* Shop Button Link Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    name="shopButtonLink"
                    value={shopButtonLink}
                    onChange={handleChange}
                    label="Shop Button Link"
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
