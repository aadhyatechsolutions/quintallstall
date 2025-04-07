import React, { useState } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCoinType } from "../../../../redux/coinTypeSlice"; // Import the addCoinType action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function CreateCoinType() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCoinType = { 
        ...state
    }; 

    dispatch(addCoinType(newCoinType)); // Add to the store

    setState({
      name: "",
      description: "",
    });

    navigate("/settings/coin-type/view"); // Redirect after submit
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { name, description } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Coin Type", path: "/coin-type/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Coin Type">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Coin Type Name Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  label="Coin Type Name"
                  required
                />
              </Grid>

              {/* Coin Type Description Field */}
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
