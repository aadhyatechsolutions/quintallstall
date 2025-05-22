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
  import { useNavigate } from "react-router-dom";
  import useUserStore from "../../store/user/userStore";
  import useRoleStore from "../../store/role/roleStore";
  import useApmcStore from "../../store/apmc/apmcStore";
  // import useVehicleStore from "../../store/vehicle/vehicleStore";
  import useVehicleTypeStore from "../../store/vehicleType/vehicleTypeStore";

  
  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  
  export default function CreateDelivery() {
    const navigate = useNavigate();
    const { createUser, error:userError} = useUserStore();
    const { fetchRoles, roles, loading: roleLoading, error: roleError } = useRoleStore();
    const { apmcs, fetchApmcs, loading: apmcLoading, error: apmcError } = useApmcStore();
    // const { fetchVehicleTypes, vehicleTypes, vehicleTypesLoading } = useVehicleStore();
    const { vehicleTypes, fetchVehicleTypes } = useVehicleTypeStore();
  
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
      role: "delivery", 
      profile_image: null,
      vehicle_type_id: "",
      vehicle_no: "",
      permit_number: "",
      insurance_number: "",
    });
  
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });
  
    // Fetch APMC options on component mount
    useEffect(() => {
      fetchApmcs();
      fetchVehicleTypes();
    }, [fetchApmcs, fetchVehicleTypes]);
  
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
          if (
            ["vehicle_type_id", "vehicle_no", "permit_number", "insurance_number"].includes(key)
          ) {
            data.append(`vehicle[${key}]`, formData[key]);
          } else if (key !== "profile_image") {
            data.append(key, formData[key]);
          }
        }
      }
      
  
      if (formData.profile_image) {
        data.append("profile_image", formData.profile_image);
      }
  
      try {
        await createUser(data);
        if(!userError){
          setSnackbar({
            open: true,
            message: "Delivery created successfully!",
            severity: "success",
          });
    
          setTimeout(() => navigate("/features/delivery/view"), 1500);
        }else{
          setSnackbar({
            open: true,
            message: userError,
            severity: "error",
          });
        }
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "Failed to create delivery",
          severity: "error",
        });
      }
    };
  
    return (
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Deliverys", path: "/features/user/view" },
              { name: "Create Delivery" },
            ]}
          />
        </Box>
  
        <SimpleCard title="Create Delivery">
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
                  value={formData.ifsc_code}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    if (/^[A-Z]{0,4}$/.test(value) || /^[A-Z]{4}0[A-Z0-9]{0,6}$/.test(value)) {
                      handleChange({ target: { name: "ifsc_code", value } });
                    }
                  }}
                  inputProps={{
                    maxLength: 11,
                    inputMode: 'text',
                    pattern: '^[A-Z]{4}0[A-Z0-9]{6}$'
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
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
                  <Select
                    labelId="vehicle-type-label"
                    name="vehicle_type_id"
                    value={formData.vehicle_type_id}
                    onChange={handleChange}
                    label="Vehicle Type"
                  >
                    {vehicleTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Vehicle Number"
                  name="vehicle_no"
                  placeholder="e.g. MH 12 AB 1234"
                  value={formData.vehicle_no}
                  onChange={handleChange}
                  inputProps={{
                    maxLength: 13,
                    pattern: '^[A-Z]{2}\\s\\d{2}\\s?[A-Z]{1,2}\\s?\\d{1,4}$',
                    style: { textTransform: 'uppercase' },
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Permit Number"
                  name="permit_number"
                  placeholder="e.g. MH/TRANS/2021/12345"
                  value={formData.permit_number}
                  onChange={handleChange}
                  inputProps={{
                    maxLength: 20,
                    pattern: '^[A-Z]{2}[-/]?[A-Z]*[-/]?\\d{4}[-/]?\\d{1,6}$',
                    style: { textTransform: 'uppercase' },
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Insurance Number"
                  name="insurance_number"
                  placeholder="e.g. OG-19-1234-5678-00000000"
                  value={formData.insurance_number}
                  onChange={handleChange}
                  inputProps={{
                    maxLength: 20,
                    pattern: '^[A-Za-z0-9/-]{8,20}$',
                    style: { textTransform: 'uppercase' },
                  }}
                  required
                />
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
                  Save Delivery
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
  