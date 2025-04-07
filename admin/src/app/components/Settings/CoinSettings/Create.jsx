import React, { useState } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCoinListItem } from "../../../../redux/coinListSlice"; // Import the addCoinListItem action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function CreateCoinListItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    value: "",
    status: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCoinListItem = {
      ...state,
      value: parseInt(state.value), // Assuming value should be a number
    };

    dispatch(addCoinListItem(newCoinListItem)); // Add to the store

    setState({
      name: "",
      value: "",
      status: "",
    });

    navigate("/settings/coin-list/view"); // Redirect after submit
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { name, value, status } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Coin List", path: "/coin-list/view" },
            { name: "Create" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Coin List Item">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Coin List Name Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  label="Coin List Name"
                  required
                />
              </Grid>

              {/* Coin List Value Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="value"
                  value={value}
                  onChange={handleChange}
                  label="Coin List Value"
                  required
                />
              </Grid>

              {/* Coin List Status Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="status"
                  value={status}
                  onChange={handleChange}
                  label="Coin List Status"
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
