import { Stack, Box, styled, Button, Icon, TextField, Grid, Input,FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProductMaster } from '../../../../redux/productMasterSlice'; // Import the editProductMaster action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function EditProductMaster() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    productMaster: "",
    description: "",
    file: null,
  });
  const categorieOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "furniture", label: "Furniture" },
    { value: "clothing", label: "Clothing" },
    { value: "kitchen", label: "Kitchen" },
    { value: "sports", label: "Sports" }
  ];
  const categories = useSelector((state) => state.productMaster.data); // Accessing data directly from Redux

  const productMasterData = categories.find(cat => cat.id === parseInt(id));

  useEffect(() => {
    if (productMasterData) {
      setState({
        name: productMasterData.name,
        productMaster: productMasterData.productMaster,
        description: productMasterData.description,
        file: null,
      });
    }
  }, [productMasterData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedProductMaster = { ...state, id: parseInt(id) };

    dispatch(editProductMaster(updatedProductMaster)); // Dispatch the editProductMaster action to update the data in Redux

    setState({
      name: "",
      productMaster: "",
      description: "",
      file: null,
    });

    navigate("/products/product-master/view"); // Navigate back to the productMaster view page
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
        <Breadcrumb routeSegments={[{ name: "Product Master", path: "/products/product-master/view" }, { name: "Edit" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Edit Product Master">
          {productMasterData ? (
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
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={category}
                      onChange={handleChange}
                      label="Category"
                    >
                      {categorieOptions.map((cat) => (
                        <MenuItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
