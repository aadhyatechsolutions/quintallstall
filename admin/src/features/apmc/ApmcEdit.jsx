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
  import { Breadcrumb, SimpleCard } from "app/components";
  import { useState, useEffect } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import useApmcStore from "../../store/apmc/apmcStore"; 
  
  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  
  export default function EditApmc() {
    const { id } = useParams();  // Get apmc ID from URL
    const navigate = useNavigate();
    const { apmcs, updateApmc, fetchApmcs } = useApmcStore();  // Use apmc store
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });
  
    const [formData, setFormData] = useState({
      name: "",
      location: "",
      area: "",
      village: "",
      taluka: "",
      city: "",
      state: "",
      pincode: "",
      image: null,
    });
  
    useEffect(() => {
      fetchApmcs(); // Fetch apmcs on mount
    }, [fetchApmcs]);
  
    // Find current apmc
    const currentApmc = apmcs.find((apmc) => apmc.id === parseInt(id));
  
    useEffect(() => {
      if (currentApmc) {
        setFormData({
          name: currentApmc.name,
          location: currentApmc.location,
          area: currentApmc.area,
          village: currentApmc.village,
          taluka: currentApmc.taluka,
          city: currentApmc.city,
          state: currentApmc.state,
          pincode: currentApmc.pincode,
          image: null,  // Set existing image if required, but not using it here
        });
      }
    }, [currentApmc]);
  
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
        data.append('_method', 'put');
      } else {
        data = { ...formData, '_method' :'put' };
      }
  
      try {
        await updateApmc(data, parseInt(id));
  
        setSnackbar({
          open: true,
          message: "APMC updated successfully!",
          severity: "success",
        });
  
        setTimeout(() => navigate("/features/apmc/view"), 1500);  // Redirect to apmc list
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "Failed to update APMC",
          severity: "error",
        });
      }
    };
  
    if (!currentApmc) {
      return (
        <Container>
          <Alert severity="error">APMC not found</Alert>
        </Container>
      );
    }
  
    return (
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "APMC Master", path: "/features/apmc/view" },
              { name: "Edit APMC" },
            ]}
          />
        </Box>
  
        <SimpleCard title="Edit APMC">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="APMC Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Village"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Taluka"
                  name="taluka"
                  value={formData.taluka}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 6
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,6}$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  required
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
                  disabled={false} // Set to true if you need to manage loading state
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
  