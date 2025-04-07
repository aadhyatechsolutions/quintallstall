import React, { useState } from "react";
import { Box, Stack, Button, Icon, TextField, Grid, Input, FormControl, InputLabel, Select, MenuItem, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBlog } from "../../../../redux/blogSlice"; // Import the addBlog action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function CreateBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    category: "", // Category is now a string value representing the selected category
    image: null, // Initialize image as null
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBlog = { ...state, id: Date.now() };

    // Dispatch the addBlog action to Redux store
    dispatch(addBlog(newBlog));

    // Reset the form state after submission
    setState({
      name: "",
      category: "",
      image: null,
    });

    navigate("/frontend/blogs/view"); // Redirect to the blog view page
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setState({ ...state, image: event.target.files[0] });
  };

  const { name, category, image } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Blog", path: "/blog/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Blog">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Blog Name Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  label="Blog Name"
                  required
                />
              </Grid>

              {/* Category Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={category}
                    onChange={handleChange}
                    label="Category"
                    required
                  >
                    <MenuItem value="">
                      <em>--- Select Category ---</em>
                    </MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Health">Health</MenuItem>
                    <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Image Upload Field */}
              <Grid item xs={12} sm={6}>
                <Input
                  accept="image/*"
                  id="image-upload"
                  type="file"
                  onChange={handleFileChange}
                  fullWidth
                  sx={{
                    display: "none",
                  }}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="contained"
                    component="span"
                    fullWidth
                    sx={{
                      display: "block",
                      textTransform: "capitalize",
                      color: image ? "green" : "default",
                    }}
                  >
                    {image ? "Image Selected" : "Choose Image"}
                  </Button>
                </label>
              </Grid>
            </Grid>

            <Button color="primary" variant="contained" type="submit" sx={{ mt: 3 }}>
              <Icon>send</Icon>
              <span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</span>
            </Button>
          </form>
        </SimpleCard>
      </Stack>
    </Container>
  );
}
