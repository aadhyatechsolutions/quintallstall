import React, { useState, useEffect } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCoinType } from "../../../../redux/coinTypeSlice"; // Import the edit action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function EditCoinType() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    srNo: "",
    name: "",
    description: "",
  });

  // Assuming coin types are available in the Redux store
  const coinTypes = useSelector((state) => state.coinType.data);

  // Find the specific coin type data by srNo (id in params)
  const coinTypeData = coinTypes.find((item) => item.srNo == parseInt(id));

  useEffect(() => {
    // If we have the coinTypeData, set it into the state
    if (coinTypeData) {
      setState({
        srNo: coinTypeData.srNo,
        name: coinTypeData.name,
        description: coinTypeData.description,
      });
    }
  }, [coinTypeData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an updated coin type object and dispatch it to Redux
    const updatedCoinType = { ...state };

    dispatch(editCoinType(updatedCoinType));

    setState({
      name: "",
      description: "",
    });

    navigate("/settings/coin-type/view"); // Navigate to the view page after editing
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { name, description } = state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Coin Type", path: "/coin-type/view" }, { name: "Edit" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Edit Coin Type">
          {coinTypeData ? (
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
                    label="Coin Type Name"
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
                    label="Coin Type Description"
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
