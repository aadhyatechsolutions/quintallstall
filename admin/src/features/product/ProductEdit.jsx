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
import useUserStore from "../../store/user/userStore"; // Assuming you have a store for users

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function EditProduct() {
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate();
  const { fetchProductById, updateProduct } = useProductStore(); // Use Zustand store for product
  const { fetchCategories, categories, loading, error } = useCategoryStore(); // For category data
  const { fetchUsers, users:sellers } = useUserStore(); // Assuming you have a user store
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "", // Added price to form data
    image: null,
    seller: "", // Added user to form data
    quantity: "", // Quantity field
    unit: "kg", // Unit field with default "kg"
    status: "active", // Status field with default "active"
  });

  // Fetch categories and users from the server
  useEffect(() => {
    fetchCategories();
    fetchUsers(); // Assuming you fetch users from an API or store
  }, [fetchCategories, fetchUsers]);

  // Fetch product data using the ID
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await fetchProductById(id); // Fetch product by ID from store
        setFormData({
          name: product.name,
          category: product.category.id, // Assuming category has an 'id'
          description: product.description,
          price: product.price, // Set the price of the product
          image: null, // Don't pre-populate image, allow user to upload a new one
          seller: product.seller.id, // Assuming user has an 'id'
          quantity: product.quantity || "", // Assuming quantity exists on the product
          unit: product.unit || "kg", // Set unit if available
          status: product.status || "active", // Set status if available
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

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();

    // If there's an image, append it to the form data
    if (formData.image) {
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          data.append(key, formData[key]);
        }
      }
      data.append("_method", "put");
    } else {
      data = { ...formData, _method: "put" }; // If no image, just send the form data
    }

    try {
      await updateProduct(data, id); // Update the product using the ID
      setSnackbar({
        open: true,
        message: "Product updated successfully!",
        severity: "success",
      });

      setTimeout(() => navigate("/features/product/view"), 1500);
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
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Products", path: "/features/product/view" },
            { name: "Edit Product" },
          ]}
        />
      </Box>

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
                  <MenuItem value="pending">Pending</MenuItem> {/* Example additional status */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Vendor Name</InputLabel>
                <Select
                  name="user"
                  value={formData.seller}
                  onChange={handleChange}
                  label="User"
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
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
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
