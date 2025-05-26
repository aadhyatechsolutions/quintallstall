import {
  Box,
  styled,
  Button,
  Icon,
  TextField,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSpecialOfferStore from "../../store/specialOffer/specialOfferStore";

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
  const {
    specialOffers,
    updateSpecialOffer,
    fetchSpecialOffers,
  } = useSpecialOfferStore();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    title: "",
    second_title: "",
    short_description: "",
    image: null,
    shop_button_text: "",
  });

  useEffect(() => {
    fetchSpecialOffers(); // Load all offers, if needed for local data
  }, [fetchSpecialOffers]);

  const currentOffer = specialOffers.find((offer) => offer.id === parseInt(id));

  useEffect(() => {
    if (currentOffer) {
      setFormData({
        title: currentOffer.title || "",
        second_title: currentOffer.second_title || "",
        short_description: currentOffer.short_description || "",
        image: null, // Set file input empty initially
        shop_button_text: currentOffer.shop_button_text || "",
      });
    }
  }, [currentOffer]);

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

    if (formData.image) {
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          data.append(key, formData[key]);
        }
      }
      data.append("_method", "put");
    } else {
      data = { ...formData, _method: "put" };
    }

    try {
      await updateSpecialOffer(data, parseInt(id));
      setSnackbar({
        open: true,
        message: "Special offer updated successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/frontend/special-offer/list"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to update special offer",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Special Offers", path: "/offers/view" },
            { name: "Edit Special Offer" },
          ]}
        />
      </Box>

      <SimpleCard title="Edit Special Offer">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Second Title"
                name="second_title"
                value={formData.second_title}
                onChange={handleChange}
              />
            </Grid>

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

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Shop Button Text"
                name="shop_button_text"
                value={formData.shop_button_text}
                onChange={handleChange}
              />
            </Grid>

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

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Icon>save</Icon>}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </SimpleCard>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}
