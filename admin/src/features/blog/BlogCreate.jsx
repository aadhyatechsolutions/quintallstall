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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SimpleCard } from "app/components";
import useBlogStore from "../../store/blog/blogStore";
import useCategoryStore from "../../store/category/categoryStore"; // if applicable

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function BlogCreate() {
  const navigate = useNavigate();
  const { addBlog } = useBlogStore();
  const { fetchCategories, categories } = useCategoryStore(); // optional

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    status: "draft",
    author: "", // set default if needed
    image: null,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchCategories(); // optional
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await addBlog(data);
      setSnackbar({
        open: true,
        message: "Blog created successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/features/blog/list"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to create blog",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <SimpleCard title="Create Blog">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Title */}
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

            {/* Category (optional) */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Content */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                </Select>
              </FormControl>
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
                  onChange={handleImageChange}
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

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Icon>save</Icon>}
              >
                Save Blog
              </Button>
            </Grid>
          </Grid>
        </form>
      </SimpleCard>

      {/* Snackbar */}
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
