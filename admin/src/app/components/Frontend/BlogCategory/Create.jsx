import React, { useState } from "react";
import { Box, Stack, Button, Icon, TextField, Grid, FormControl, InputLabel, Select, MenuItem, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../../redux/blogCategorySlice"; // Import the addCategory action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function CreateCategory() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCategory = { ...state, srNo: Date.now() }; // Generate unique srNo based on current timestamp

    dispatch(addCategory(newCategory));

    // Reset the form
    setState({
      name: "",
      description: "",
    });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { name, description } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Blog Category", path: "/blog/category/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Category">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Category Name Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  label="Category Name"
                  required
                />
              </Grid>

              {/* Category Description Field */}
              <Grid item xs={12} sm={6}>
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
