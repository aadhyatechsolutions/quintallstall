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
import React, { useEffect, useState } from "react";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../../store/user/userStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function EditStaff() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchUserById, updateStaff, currentUser } = useUserStore();

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
    useEffect(() => {
      fetchUserById(id);
    }, [fetchUserById, id]);
  useEffect(() => {
    if (currentUser) {
        try {
    
            setFormData({
                first_name: currentUser.first_name || "",
                last_name: currentUser.last_name || "",
                email: currentUser.email || "",
                phone_number: currentUser.phone_number || "",
                password: "",
                password_confirmation: "",
                profile_image: null,
                role: "staff", 
            });
        } catch (err) {
            setSnackbar({
            open: true,
            message: "Failed to load staff data",
            severity: "error",
            });
        }
    }
    }, [currentUser]);

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
    for (const key in formData) {
        if (key !== "profile_image") {
            data.append(key, formData[key]);
        }
    }
    if (formData.profile_image) {
    data.append("profile_image", formData.profile_image);
    }
    data.append('_method', 'put');
    try {
      await updateStaff(id, data);
      setSnackbar({
        open: true,
        message: "Staff updated successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/settings/staff/view"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to update staff",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Staff", path: "/settings/staff/view" }, { name: "Edit Staff" }]} />
      </Box>

      <SimpleCard title="Edit Staff">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required />
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
              <TextField fullWidth label="Password" name="password" value={formData.password} onChange={handleChange} type="password" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Confirm Password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} type="password" />
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
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" startIcon={<Icon>save</Icon>}>
                Update Staff
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
