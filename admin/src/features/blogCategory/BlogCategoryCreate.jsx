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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBlogCategoryStore from "../../store/blogCategory/blogCategoryStore"; // Adjust path as needed

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function BlogCategoryCreate() {
  const navigate = useNavigate();

  const { createBlogCategory, loading } = useBlogCategoryStore();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlogCategory(formData);
      setSnackbar({
        open: true,
        message: "Blog category created successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/frontend/blog-category/list"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to create blog category",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <SimpleCard title="Create Blog Category">
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
                {loading ? "Saving..." : "Create"}
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
