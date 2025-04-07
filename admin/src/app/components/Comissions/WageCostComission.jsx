import React, { useState, useEffect } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setWageCostComission } from "../../../redux/wageCostComissionSlice";  // Import the action
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

export default function WageCostComission() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to hold form input values
  const [costPerKg, setCostPerKg] = useState("");
  const [comissionPercentage, setComissionPercentage] = useState("");

  // Get existing wage cost commission values from Redux store (if available)
  const wageCostComission = useSelector((state) => state.wageCostComission);

  useEffect(() => {
    if (wageCostComission) {
      setCostPerKg(wageCostComission.costPerKg);
      setComissionPercentage(wageCostComission.comissionPercentage);
    }
  }, [wageCostComission]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const wageData = {
      costPerKg: Number(costPerKg),
      comissionPercentage: Number(comissionPercentage),
    };

    // Dispatch action to update the Redux store
    dispatch(setWageCostComission(wageData));

    // Reset form values
    setCostPerKg("");
    setComissionPercentage("");

    // Navigate back to the view page after saving the data
    navigate("/comissions/wage-cost-comission");
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Wage Cost Comission", path: "/wage-cost-comissions/view" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Wage Cost Comission">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Cost Per KG Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="number"
                  name="costPerKg"
                  value={costPerKg}
                  onChange={(e) => setCostPerKg(e.target.value)}
                  label="Cost per KG"
                  required
                />
              </Grid>

              {/* Comission in % Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="number"
                  name="comissionPercentage"
                  value={comissionPercentage}
                  onChange={(e) => setComissionPercentage(e.target.value)}
                  label="Comission in %"
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
