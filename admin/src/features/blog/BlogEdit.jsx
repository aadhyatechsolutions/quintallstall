import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { SimpleCard } from "app/components";
import { useNavigate, useParams } from "react-router-dom";
import useBlogStore from "../../store/blog/blogStore";
import useBlogCategoryStore from "../../store/blogCategory/blogCategoryStore";

export default function BlogEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // get blog id from route param
  const { fetchBlogById, updateBlog } = useBlogStore();
  const { blogCategories, fetchBlogCategories } = useBlogCategoryStore();

  const [form, setForm] = useState({
    title: "",
    blog_category_id: "",
    excerpt: "",
    content: {
      introduction: "",
      features: [],
      conclusion: "",
    },
    tags: [],
    author: "",
    image: null,
    currentImageUrl: "", // to show current image preview if no new image selected
  });

  useEffect(() => {
    fetchBlogCategories();
  }, [fetchBlogCategories]);

  useEffect(() => {
    async function loadBlog() {
      const blog = await fetchBlogById(id);
      if (blog) {
        setForm({
          title: blog.title || "",
          blog_category_id: blog.blog_category_id || "",
          excerpt: blog.excerpt || "",
          content: blog.content || { introduction: "", features: [], conclusion: "" },
          tags: blog.tags || [],
          author: blog.author || "",
          image: null,
          currentImageUrl: blog.image ? `/storage/${blog.image}` : "",
        });
      }
    }
    if (id) loadBlog();
  }, [id, fetchBlogById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["introduction", "conclusion"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          [name]: value,
        },
      }));
    } else if (name === "tags") {
      setForm((prev) => ({ ...prev, tags: value.split(",") }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...form.content.features];
    newFeatures[index] = value;
    setForm((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        features: newFeatures,
      },
    }));
  };

  const addFeature = () => {
    setForm((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        features: [...prev.content.features, ""],
      },
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = form.content.features.filter((_, i) => i !== index);
    setForm((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        features: newFeatures,
      },
    }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("blog_category_id", form.blog_category_id);
    formData.append("excerpt", form.excerpt);
    formData.append("content", JSON.stringify(form.content));
    formData.append("tags", JSON.stringify(form.tags));
    formData.append("author", form.author);
    if (form.image) {
      formData.append("image", form.image);
    }
    formData.append("_method", 'PUT');
    await updateBlog(id, formData);
    navigate("/frontend/blogs/list");
    
  };

  return (
    <Box m={3}>
      <SimpleCard title="Edit Blog">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Category"
                name="blog_category_id"
                value={form.blog_category_id}
                onChange={handleChange}
              >
                {blogCategories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Excerpt"
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Introduction"
                name="introduction"
                value={form.content.introduction}
                onChange={handleChange}
                multiline
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Features</Typography>
              {form.content.features.map((feature, index) => (
                <Box key={index} display="flex" mb={1}>
                  <TextField
                    fullWidth
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                  />
                  <Button onClick={() => removeFeature(index)}>Remove</Button>
                </Box>
              ))}
              <Button onClick={addFeature}>Add Feature</Button>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Conclusion"
                name="conclusion"
                value={form.content.conclusion}
                onChange={handleChange}
                multiline
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tags (comma-separated)"
                name="tags"
                value={form.tags.join(",")}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Author"
                name="author"
                value={form.author}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Image
                <input type="file" hidden onChange={handleImageChange} />
              </Button>
              {form.image ? (
                <Box mt={2}>
                  <img
                    src={URL.createObjectURL(form.image)}
                    alt="preview"
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                </Box>
              ) : null}
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Update Blog
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
    </Box>
  );
}
