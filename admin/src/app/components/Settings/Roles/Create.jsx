import React, { useState } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRole } from "../../../../redux/roleSlice"; // Import the addRole action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function CreateRole() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRole = {
      ...state,
    };

    dispatch(addRole(newRole)); // Add the new role to the Redux store

    // Reset the form state
    setState({
      name: "",
      slug: "",
      description: "",
    });

    navigate("/settings/roles/view"); // Redirect to the roles list page after submit
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { name, slug, description } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Roles", path: "/roles/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Role">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Role Name Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  label="Role Name"
                  required
                />
              </Grid>

              {/* Role Slug Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="slug"
                  value={slug}
                  onChange={handleChange}
                  label="Role Slug"
                  required
                />
              </Grid>

              {/* Role Description Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  label="Role Description"
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
        </SimpleCard>
      </Stack>
    </Container>
  );
}
