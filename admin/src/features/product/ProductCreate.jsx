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
  } from "@mui/material";
  import React, { useEffect } from "react";
  import { Breadcrumb, SimpleCard } from "app/components";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import useProductStore from "../../store/product/productStore";
  import useCategoryStore from "../../store/category/categoryStore"; 
  import useUserStore from "../../store/user/userStore";
  import useApmcStore from "../../store/apmc/apmcStore";
  import useAuth from "app/hooks/useAuth";
  import { authRoles } from "app/auth/authRoles";
  
  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  
  export default function Create() {
    const navigate = useNavigate();
    const { userRoles, user: currentUser } = useAuth();
    const { addProduct } = useProductStore();
    const { fetchCategories, categories, loading, error } = useCategoryStore();
    const { fetchUsers, users: sellers } = useUserStore();
    const { fetchApmcs, apmcs, loading: apmcLoading, error: apmcError } = useApmcStore();
  
    const isAdmin = [authRoles.admin].some(role => userRoles.includes(role));
  
    const [formData, setFormData] = useState({
      name: "",
      category: "",
      description: "",
      price: "",
      quantity: "",
      unit: "kg", 
      status: "active", 
      seller: !isAdmin ? currentUser.id : "", 
      image: null,
      feature_image: null, 
      sku: "",
      production: "",
      quality: "a", 
      ud_field: "",
      return_policy: "",
      discount_price: "",
    });
  
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });
  
    useEffect(() => {
      fetchCategories();
      fetchUsers();
      fetchApmcs();
    }, [fetchCategories, fetchUsers, fetchApmcs]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleFileChange = (e) => {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };
  
    const handleFeatureImageChange = (e) => {
      setFormData((prev) => ({ ...prev, feature_image: e.target.files[0] }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      var data = new FormData();
      if (formData.image) {
        for (const key in formData) {
          if (formData.hasOwnProperty(key)) {
            data.append(key, formData[key]);
          }
        }
      } else {
        data = { ...formData };
      }
  
      try {
        addProduct(data);
        setSnackbar({
          open: true,
          message: "Product created successfully!",
          severity: "success",
        });
  
        setTimeout(() => navigate("/features/product/list"), 1500);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "Failed to create product",
          severity: "error",
        });
      }
    };
  
    return (
      <Container>
        {/* <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Product Master", path: "/features/product/view" },
              { name: "Create Product" },
            ]}
          />
        </Box> */}
  
        <SimpleCard title="Create Product">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Product Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              {/* Category */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                  >
                    {loading ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : error ? (
                      <MenuItem disabled>{error}</MenuItem>
                    ) : (
                      categories.map((opt) => (
                        <MenuItem key={opt.id} value={opt.id}>
                          {opt.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Grid>
               {/* Description */}
               <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>APMC</InputLabel>
                <Select
                  name="apmc"
                  value={formData.apmc}
                  onChange={handleChange}
                  label="APMC"
                >
                  {apmcLoading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : apmcError ? (
                    <MenuItem disabled>{apmcError}</MenuItem>
                  ) : (
                    apmcs.map((apmc) => (
                      <MenuItem key={apmc.id} value={apmc.id}>
                        {apmc.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>     
             
  
              {/* Price */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              {/* Quantity */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              {/* Unit */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Unit</InputLabel>
                  <Select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    label="Unit"
                  >
                    <MenuItem value="kg">Kg</MenuItem>
                    <MenuItem value="gram">Gram</MenuItem>
                    <MenuItem value="quintal">Quintal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
  
              {/* Status */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="Status"
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
  
              {/* Seller */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Vendor Name</InputLabel>
                  <Select
                    name="seller"
                    value={formData.seller}
                    onChange={handleChange}
                    label="Seller"
                    disabled={!isAdmin}
                  >
                    {sellers.length === 0 ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : (
                      sellers.map((seller) => (
                        <MenuItem key={seller.id} value={seller.id}>
                          {seller.first_name} {seller.last_name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Grid>
  
              {/* SKU */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SKU"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              {/* Production Date */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Production"
                  name="production"
                  type="text"
                  value={formData.production}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              {/* Quality */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Quality</InputLabel>
                  <Select
                    name="quality"
                    value={formData.quality}
                    onChange={handleChange}
                    label="Quality"
                  >
                    <MenuItem value="a">A</MenuItem>
                    <MenuItem value="b">B</MenuItem>
                    <MenuItem value="c">C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
  
              {/* UD Field */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="UD Field"
                  name="ud_field"
                  value={formData.ud_field}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              {/* Return Policy */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Return Policy"
                  name="return_policy"
                  value={formData.return_policy}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              {/* Discount Price */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Discount Price"
                  name="discount_price"
                  type="number"
                  value={formData.discount_price}
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
  
              {/* Feature Image Upload */}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Icon>upload</Icon>}
                >
                  Upload Feature Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFeatureImageChange}
                  />
                </Button>
                {formData.feature_image && (
                  <Box sx={{ mt: 1, color: "text.secondary" }}>
                    {formData.feature_image instanceof File
                      ? `Selected: ${formData.feature_image.name}`
                      : "Using existing feature image"}
                  </Box>
                )}
              </Grid>
  
              {/* Submit Button */}
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<Icon>save</Icon>}
                >
                  Save Product
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
  