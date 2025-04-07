import React, { useState, useEffect } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPlatformPrice } from "../../../redux/platformComissionSlice"; // Your Redux action
import { useNavigate } from "react-router-dom";
import { SimpleCard } from "app/components";
import { Breadcrumb } from "app/components";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function PlatformComission() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the current platform price from the Redux store
  const currentPlatformPrice = useSelector((state) => state.platformComission.platformPrice);

  const [platformPrice, setPlatformPriceState] = useState(currentPlatformPrice || 500); // Default price (500) if no value in Redux

  // Set the updated price in state after Redux update
  useEffect(() => {
    setPlatformPriceState(currentPlatformPrice);
  }, [currentPlatformPrice]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setPlatformPrice(Number(platformPrice)));  // Dispatch the updated price to Redux
    // After submitting, stay on the same page and show the updated price
    navigate("/comissions/platform-comission");  // Re-navigate to refresh the view
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Platform Comission", path: "/platform-comissions/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Platform Comission">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Platform Price Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="number"
                  name="platformPrice"
                  value={platformPrice}
                  onChange={(e) => setPlatformPriceState(e.target.value)}
                  label="Platform Price"
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
