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
import { Breadcrumb, SimpleCard } from "app/components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userRoles, user: currentUser } = useAuth();
  const { fetchProductById, updateProduct } = useProductStore();
  const { fetchCategories, categories, loading, error } = useCategoryStore();
  const { fetchUsers, users: sellers } = useUserStore();
  const { fetchApmcs, apmcs, loading: apmcLoading, error: apmcError } = useApmcStore();
  const isAdmin = [authRoles.admin].some((role) => userRoles.includes(role));

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
    apmc: ""
  });

  useEffect(() => {
    fetchApmcs();
    fetchCategories();
    fetchUsers();
    
  }, [fetchCategories, fetchUsers, fetchApmcs]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await fetchProductById(id);
        setFormData({
          name: product.name,
          category: product.category.id,
          description: product.description,
          price: product.price,
          quantity: product.quantity || "",
          unit: product.unit || "kg",
          status: product.status || "active",
          seller: product.seller.id,
          image: null,
          feature_image: null,
          sku: product.sku || "",
          production: product.production || "",
          quality: product.quality || "a",
          ud_field: product.ud_field || "",
          return_policy: product.return_policy || "",
          discount_price: product.discount_price || "",
          apmc: product.apmc_id || "",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to load product data.",
          severity: "error",
        });
      }
    };

    loadProduct();
  }, [id, fetchProductById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [fieldName]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;

    const hasImage = formData.image instanceof File || formData.feature_image instanceof File;

    if (hasImage) {
      data = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      }
      data.append("_method", "put");
    } else {
      data = { ...formData, _method: "put" };
    }

    try {
      await updateProduct(data, id);
      setSnackbar({
        open: true,
        message: "Product updated successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/features/product/list"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to update product",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      {/* <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Products", path: "/features/product/view" },
            { name: "Edit Product" },
          ]}
        />
      </Box> */}

      <SimpleCard title="Edit Product">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>

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
                        {seller.first_name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Production"
                name="production"
                value={formData.production}
                onChange={handleChange}
                required
              />
            </Grid>

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

            {/* Image Upload */}
            <Grid item xs={12} md={6}>
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
                  onChange={(e) => handleFileChange(e, "image")}
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
            <Grid item xs={12} md={6}>
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
                  onChange={(e) => handleFileChange(e, "feature_image")}
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

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Icon>save</Icon>}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
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
