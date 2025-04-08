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
  const { products, updateProduct } = useProductStore();
  const { fetchCategories, categories, loading, error } = useCategoryStore();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  // Find current product
  const currentProduct = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        name: currentProduct.name,
        category: currentProduct.category,
        description: currentProduct.description,
        image: null,
      });
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
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
      data.append('_method', 'put');
    }else{
      data = { ...formData, '_method' :'put' };
    }

    try {

      await updateProduct(data, parseInt(id));

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

  if (!currentProduct) {
    return (
      <Container>
        <Alert severity="error">Product not found</Alert>
      </Container>
    );
  }

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
