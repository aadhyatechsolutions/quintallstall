import {
  Box,
  Button,
  Grid,
  Icon,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/user/userStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function CreateStaff() {
  const navigate = useNavigate();
  const { createStaff } = useUserStore();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
    profile_image: null,
    role: "staff", 
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
    setFormData((prev) => ({ ...prev, profile_image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await createStaff(data);
      setSnackbar({
        open: true,
        message: "Staff created successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/settings/staff/list"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to create staff",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Staff", path: "/features/staff/view" }, { name: "Create Staff" }]} />
      </Box>

      <SimpleCard title="Create Staff">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} required type="email" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Phone Number" 
                name="phone_number" 
                value={formData.phone_number} 
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    handleChange(e);
                  }
                }}
                required
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  maxLength: 10
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Password" name="password" value={formData.password} onChange={handleChange} required type="password" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Confirm Password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required type="password" />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label" startIcon={<Icon>upload</Icon>}>
                Upload Profile Image
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </Button>
              {formData.profile_image && (
                <Box sx={{ mt: 1, color: "text.secondary" }}>
                  Selected: {formData.profile_image.name}
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
              <Button type="submit" variant="contained" color="primary" startIcon={<Icon>save</Icon>}>
                Save Staff
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </SimpleCard>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}
