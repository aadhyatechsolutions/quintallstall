import React, { useState, useEffect } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editRole } from "../../../../redux/roleSlice"; // Import the edit action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function EditRole() {
  const { id } = useParams(); // Get role ID from URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    srNo: "",
    name: "",
    slug: "",
    description: "",
  });

  // Get role data from Redux store
  const roles = useSelector((state) => state.roles.data);

  // Find the specific role data by srNo (id in params)
  const roleData = roles.find((item) => item.srNo == parseInt(id));

  useEffect(() => {
    // If role data is found, set it into state
    if (roleData) {
      setState({
        srNo: roleData.srNo,
        name: roleData.name,
        slug: roleData.slug,
        description: roleData.description,
      });
    }
  }, [roleData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an updated role object and dispatch it to Redux
    const updatedRole = { ...state };

    dispatch(editRole(updatedRole));

    setState({
      name: "",
      slug: "",
      description: "",
    });

    navigate("/settings/roles/view"); // Navigate to the roles list after editing
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { name, slug, description } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Roles", path: "/roles/view" }, { name: "Edit" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Edit Role">
          {roleData ? (
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
                    label="Role Name"
                    required
                  />
                </Grid>

                {/* Slug Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    name="slug"
                    value={slug || ""}
                    onChange={handleChange}
                    label="Role Slug"
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
          ) : (
            <p>Loading...</p>
          )}
        </SimpleCard>
      </Stack>
    </Container>
  );
}
