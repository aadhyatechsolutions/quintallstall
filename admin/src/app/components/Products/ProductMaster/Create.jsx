import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useState } from "react";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Input, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductMaster } from '../../../../redux/productMasterSlice';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function CreateAMPC() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    category: "",
    description: "",
    file: null,
  });

  // Categories data (you can fetch this from the API or use static data)
  const categorieOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "furniture", label: "Furniture" },
    { value: "clothing", label: "Clothing" },
    { value: "kitchen", label: "Kitchen" },
    { value: "sports", label: "Sports" }
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProductMaster = { ...state, id: Date.now() };

    dispatch(addProductMaster(newProductMaster));

    setState({
      name: "",
      category: "",
      description: "",
      file: null,
    });

    navigate("/products/product-master/view");
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
        <Breadcrumb routeSegments={[{ name: "Product Master", path: "/products/product-master/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Product Master">
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

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  label="Description"
                  required
                />
              </Grid>
            </Grid>

            {/* Second Row for remaining fields */}
            <Grid container spacing={2} sx={{ mt: 2 }}>              
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
        </SimpleCard>
      </Stack>
    </Container>
  );
}
