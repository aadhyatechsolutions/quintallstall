import React, { useState, useEffect } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTaxSlab } from "../../../redux/taxSlabSlice"; // Your Redux action
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

export default function TaxSlabCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the current tax slab from the Redux store
  const currentTaxSlab = useSelector((state) => state.taxSlab.taxSlabData);

  const [cgst, setCgst] = useState(currentTaxSlab?.cgst || "");
  const [sgst, setSgst] = useState(currentTaxSlab?.sgst || "");
  const [igst, setIgst] = useState(currentTaxSlab?.igst || "");

  // Set the updated tax slab in state after Redux update
  useEffect(() => {
    setCgst(currentTaxSlab?.cgst || "");
    setSgst(currentTaxSlab?.sgst || "");
    setIgst(currentTaxSlab?.igst || "");
  }, [currentTaxSlab]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const taxSlab = { cgst, sgst, igst };

    dispatch(setTaxSlab(taxSlab)); // Dispatch the updated tax slab data to Redux
    navigate("/settings/tax-slab"); // Re-navigate to refresh the view or to another page
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Tax Slabs", path: "/tax/tax-slab" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Tax Slab">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* CGST Field */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  name="cgst"
                  value={cgst}
                  onChange={(e) => setCgst(e.target.value)}
                  label="CGST"
                  required
                />
              </Grid>

              {/* SGST Field */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  name="sgst"
                  value={sgst}
                  onChange={(e) => setSgst(e.target.value)}
                  label="SGST"
                  required
                />
              </Grid>

              {/* IGST Field */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  name="igst"
                  value={igst}
                  onChange={(e) => setIgst(e.target.value)}
                  label="IGST"
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
