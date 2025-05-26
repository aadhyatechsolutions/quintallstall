import {
  Stack,
  Box,
  styled,
  Button,
  Icon,
  TextField,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import useSpecialOfferStore from "../../store/specialOffer/specialOfferStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function SpecialOfferCreate() {
  const navigate = useNavigate();
  const { createSpecialOffer } = useSpecialOfferStore();

  const [formData, setFormData] = useState({
    title: "",
    second_title: "",
    short_description: "",
    image: null,
    shop_button_text: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        data.append(key, formData[key]);
      }
    }

    try {
      await createSpecialOffer(data);
      setSnackbar({
        open: true,
        message: "Special offer created successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/frontend/special-offer/list"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to create special offer",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <SimpleCard title="Create Special Offer">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Second Title */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Second Title"
                name="second_title"
                value={formData.second_title}
                onChange={handleChange}
              />
            </Grid>

            {/* Short Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Short Description"
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>

            {/* Shop Button Text */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Shop Button Text"
                name="shop_button_text"
                value={formData.shop_button_text}
                onChange={handleChange}
              />
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<Icon>upload</Icon>}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {formData.image && (
                <Box sx={{ mt: 1, color: "text.secondary" }}>
                  {formData.image instanceof File
                    ? `Selected: ${formData.image.name}`
                    : "Using existing image"}
                </Box>
              )}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Icon>save</Icon>}
              >
                Save Special Offer
              </Button>
            </Grid>
          </Grid>
        </form>
      </SimpleCard>

      {/* Snackbar for status messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}
