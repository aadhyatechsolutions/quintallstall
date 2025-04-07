import { Stack, Box, styled, Button, Icon, TextField, Grid, Input } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCategory } from '../../../../redux/categorySlice'; // Import the editCategory action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    category: "",
    description: "",
    file: null,
  });

  const categories = useSelector((state) => state.category.data); // Accessing data directly from Redux

  const categoryData = categories.find(cat => cat.id === parseInt(id));

  useEffect(() => {
    if (categoryData) {
      setState({
        name: categoryData.name,
        category: categoryData.category,
        description: categoryData.description,
        file: null,
      });
    }
  }, [categoryData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedCategory = { ...state, id: parseInt(id) };

    dispatch(editCategory(updatedCategory)); // Dispatch the editCategory action to update the data in Redux

    setState({
      name: "",
      category: "",
      description: "",
      file: null,
    });

    navigate("/products/category/view"); // Navigate back to the category view page
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setState({ ...state, file: event.target.files[0] });
  };

  const { name, category, description, file } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Category", path: "/products/category/view" }, { name: "Edit" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Edit Category">
          {categoryData ? (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    label="Name"
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    name="description"
                    value={description}
                    onChange={handleChange}
                    label="Description"
                    multiline
                    rows={2}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
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
                        color: file ? "green" : "default",
                      }}
                    >
                      {file ? "Image Selected" : "Choose Image"}
                    </Button>
                  </label>
                </Grid>
              </Grid>

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
