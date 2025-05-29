import {
    Stack,
    Box,
    styled,
    Button,
    Icon,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    Alert,
    Checkbox,
    FormControlLabel,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { Breadcrumb, SimpleCard } from "app/components";
  import { useNavigate, useParams } from "react-router-dom";
  import useUserStore from "../../store/user/userStore"; 
  import useRoleStore from "../../store/role/roleStore"; 
  import useApmcStore from "../../store/apmc/apmcStore"; 
  
  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  
  export default function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();
  
    const { fetchUserById, updateUser, currentUser, isLoading, error } = useUserStore();
    const { apmcs, fetchApmcs, loading: apmcLoading, error: apmcError } = useApmcStore();
  
    const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      business_name: "",
      phone_number: "",
      email: "",
      password: "",
      password_confirmation: "",
      street: "",
      city: "",
      state: "",
      postal_code: "",
      shop_number: "",
      bank_account_number: "",
      routing_number: "",
      ifsc_code: "",
      account_type: "",
      branch_name: "",
      role: "retailer", 
      profile_image: null,
      apmcs: [],
    });
  
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });
  
    
    useEffect(() => {
      fetchApmcs(); 
      fetchUserById(id);
    }, [fetchApmcs, fetchUserById, id]);
    
    useEffect(() => {
      if (currentUser) {
        setFormData({
          first_name: currentUser.first_name || "",
          last_name: currentUser.last_name || "",
          business_name: currentUser.business_name || "",
          phone_number: currentUser.phone_number || "",
          email: currentUser.email || "",
          password: "",
          password_confirmation: "",
          role:'retailer',
          street: currentUser.address.street || "",
          city: currentUser.address.city || "",
          state: currentUser.address.state || "",
          postal_code: currentUser.address.postal_code || "",
          shop_number: currentUser.address.shop_number || "",
  
          bank_account_number: currentUser.bank_account.bank_account_number || "",
          routing_number: currentUser.bank_account.routing_number || "",
          ifsc_code: currentUser.bank_account.ifsc_code || "",
          account_type: currentUser.bank_account.account_type || "",
          branch_name: currentUser.bank_account.branch_name || "",
  
          profile_image: currentUser.profile_image || null,
  
          apmcs:[],
        });
      }
    }, [currentUser]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "apmcs") {
        setFormData((prev) => ({
          ...prev,
          apmcs: value,
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    };
  
    const handleFileChange = (e) => {
      setFormData((prev) => ({ ...prev, profile_image: e.target.files[0] }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      let data = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {        
          if (key === "apmcs" && formData.apmcs.length > 0) {
            formData.apmcs.forEach((apmcId) => {
              data.append("apmcs[]", apmcId); 
            });
          } else if (key !== "profile_image") {
            data.append(key, formData[key]);
          }
        }
      }
  
      if (formData.profile_image) {
        data.append("profile_image", formData.profile_image);
      }
      data.append('_method', 'put');
  
      try {
        await updateUser(id, data, 'retailer');
  
        setSnackbar({
          open: true,
          message: "retailer updated successfully!",
          severity: "success",
        });
  
        setTimeout(() => navigate("/features/retailer/list"), 1500); 
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "Failed to update retailer",
          severity: "error",
        });
      }
    };
  
    return (
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Retailers", path: "/features/user/view" },
              { name: "Update Retailer" },
            ]}
          />
        </Box>
  
        <SimpleCard title="Update Retailer">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
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
                <TextField
                  fullWidth
                  label="Business Name"
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleChange}
                  required
                />
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
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  type="password"
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                  type="password"
                />
              </Grid>
  
              {/* Address Information */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Street Address"
                  name="street"
                  value={formData.street}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Pin Code"
                  name="postal_code"
                  value={formData.postal_code}
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
  
              {/* Bank Information */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Shop Number"
                  name="shop_number"
                  value={formData.shop_number}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z0-9]{0,4}$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  required
                  inputProps={{
                    maxLength: 4
                  }}
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bank Account Number"
                  name="bank_account_number"
                  value={formData.bank_account_number}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 18 // You can set a max depending on the bank, or allow up to 18
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,18}$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="IFSC Code"
                  name="ifsc_code"
                  placeholder="e.g. SBIN0001234"
                  value={formData.ifsc_code}
                  onChange={handleChange}
                  inputProps={{
                    maxLength: 11,
                    inputMode: 'text',
                    pattern: '^[A-Za-z]{4}[a-zA-Z0-9]{7}$',
                    style: { textTransform: 'uppercase' },
                  }}
                  required
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="account-type-label">Account Type</InputLabel>
                  <Select
                    labelId="account-type-label"
                    id="account_type"
                    name="account_type"
                    value={formData.account_type}
                    onChange={handleChange}
                    label="Account Type"
                  >
                    <MenuItem value="savings">Savings</MenuItem>
                    <MenuItem value="current">Current</MenuItem>
                    <MenuItem value="salary">Salary</MenuItem>
                    <MenuItem value="fixed_deposit">Fixed Deposit</MenuItem>
                    <MenuItem value="recurring_deposit">Recurring Deposit</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Branch Name"
                  name="branch_name"
                  value={formData.branch_name}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              {/* APMC Multi-Select Dropdown */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="apmc-label">Select APMC</InputLabel>
                  <Select
                    labelId="apmc-label"
                    id="apmcs"
                    name="apmcs"
                    multiple
                    value={formData.apmcs}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {apmcs?.map((apmc) => (
                      <MenuItem key={apmc.id} value={apmc.id}>
                        <Checkbox checked={formData.apmcs.indexOf(apmc.id) > -1} />
                        {apmc.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
  
              {/* Profile Image Upload */}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Icon>upload</Icon>}
                >
                  Upload Profile Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {formData.profile_image && (
                  <Box sx={{ mt: 1, color: "text.secondary" }}>
                    {formData.profile_image instanceof File
                      ? `Selected: ${formData.profile_image.name}`
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
                  Save Retailer
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
  