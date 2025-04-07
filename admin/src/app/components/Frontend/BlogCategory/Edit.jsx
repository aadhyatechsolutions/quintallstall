import React, { useState, useEffect } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, FormControl, InputLabel, Select, MenuItem, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCategory } from "../../../../redux/blogCategorySlice"; // Import the edit action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    srNo: "",
    name: "",
    description: "",
  });

  // Assuming blog categories are available in the Redux store
  const blogCategories = useSelector((state) => state.blogCategory.data);

  // Find the specific category data by srNo (id in params)
  const blogCategoryData = blogCategories.find((item) => item.srNo == parseInt(id));

  useEffect(() => {
    // If we have the blogCategoryData, set it into the state
    if (blogCategoryData) {
      setState({
        srNo: blogCategoryData.srNo,
        name: blogCategoryData.name,
        description: blogCategoryData.description,
      });
    }
  }, [blogCategoryData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an updated blog category object and dispatch it to Redux
    const updatedBlogCategory = { ...state };

    dispatch(editCategory(updatedBlogCategory));

    setState({
      name: "",
      description: "",
    });

    navigate("/frontend/blog-category/view"); // Navigate to the view page after editing
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { name, description } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Blog Category", path: "/blog/category/view" }, { name: "Edit" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Edit Blog Category">
          {blogCategoryData ? (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Name Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    name="name"
                    value={name || ""}
                    onChange={handleChange}
                    label="Category Name"
                    required
                  />
                </Grid>

                {/* Description Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    name="description"
                    value={description || ""}
                    onChange={handleChange}
                    label="Category Description"
                    required
                  />
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Button color="primary" variant="contained" type="submit" sx={{ mt: 3 }}>
                <Icon>send</Icon>
                <span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</span>
              </Button>
            </form>
          ) : (
            <p>Loading...</p>
          )}
        </SimpleCard>
      </Stack>
    </Container>
  );
}
