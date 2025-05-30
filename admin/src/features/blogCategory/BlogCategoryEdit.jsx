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
import { SimpleCard } from "app/components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBlogCategoryStore from "../../store/blogCategory/blogCategoryStore"; // Adjust path as needed

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function EditBlogCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchBlogCategoryById, updateBlogCategory, loading, error } = useBlogCategoryStore();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const category = await fetchBlogCategoryById(id);
        setFormData({
          name: category.name,
          description: category.description || "",
        });
      } catch (err) {
        setSnackbar({
          open: true,
          message: "Failed to load blog category data.",
          severity: "error",
        });
      }
    };

    loadCategory();
  }, [id, fetchBlogCategoryById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBlogCategory(id, formData);
      setSnackbar({
        open: true,
        message: "Blog category updated successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/frontend/blog-category/list"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to update blog category",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <SimpleCard title="Edit Blog Category">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                error={!!error}
                helperText={error && "Error loading category"}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
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
