import React, { useState, useEffect } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, MenuItem, Select, InputLabel, FormControl, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCoinListItem } from "../../../../redux/coinListSlice"; // Import the edit action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function EditCoinListItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    srNo: "",
    name: "",
    value: "",
    status: "",
  });

  // Assuming coin list items are available in the Redux store
  const coinListItems = useSelector((state) => state.coinList.data);

  // Find the specific coin list item data by srNo (id in params)
  const coinListItemData = coinListItems.find((item) => item.srNo == parseInt(id));

  useEffect(() => {
    // If we have the coinListItemData, set it into the state
    if (coinListItemData) {
      setState({
        srNo: coinListItemData.srNo,
        name: coinListItemData.name,
        value: coinListItemData.value,
        status: coinListItemData.status,
      });
    }
  }, [coinListItemData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an updated coin list item object and dispatch it to Redux
    const updatedCoinListItem = { ...state };

    dispatch(editCoinListItem(updatedCoinListItem));

    setState({
      name: "",
      value: "",
      status: "",
    });

    navigate("/settings/coin-settings/view"); // Navigate to the view page after editing
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { name, value, status } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Coin List", path: "/coin-list/view" }, { name: "Edit" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Edit Coin List Item">
          {coinListItemData ? (
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
                    label="Coin List Name"
                    required
                  />
                </Grid>

                {/* Value Field - Dropdown */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Coin List Value</InputLabel>
                    <Select
                      label="Coin List Value"
                      name="value"
                      value={value || ""}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value={100}>100</MenuItem>
                      <MenuItem value={200}>200</MenuItem>
                      <MenuItem value={500}>500</MenuItem>
                      <MenuItem value={1000}>1000</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Status Field - Dropdown */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Coin List Status</InputLabel>
                    <Select
                      label="Coin List Status"
                      name="status"
                      value={status || ""}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
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
