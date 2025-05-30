import React, { useState, useEffect } from "react";
import { Box, Stack, Grid, Button, Icon, TextField, CircularProgress, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SimpleCard, Breadcrumb } from "app/components";
import useTaxStore from "../../store/tax/taxStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function TaxSlab() {
  const navigate = useNavigate();

  // Zustand store hooks
  const { fetchAllTaxes, taxes, addTax, updateTax, loading, error } = useTaxStore();

  // Form fields
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const [igst, setIgst] = useState("");
  const [existingTaxId, setExistingTaxId] = useState(null);

  // Fetch all taxes when the component mounts
  useEffect(() => {
    const loadInitialTax = async () => {
      try {
        await fetchAllTaxes();
      } catch (err) {
        console.error("Error fetching tax slabs:", err.message);
      }
    };
    loadInitialTax();
  }, []);

  // Populate form with the first tax record (if any)
  useEffect(() => {
    if (taxes?.length > 0) {
      const first = taxes[0];
      setCgst(first.cgst?.toString() || "");
      setSgst(first.sgst?.toString() || "");
      setIgst(first.igst?.toString() || "");
      setExistingTaxId(first.id);
    }
  }, [taxes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      cgst: parseFloat(cgst),
      sgst: parseFloat(sgst),
      igst: parseFloat(igst),
    };

    try {
      if (existingTaxId) {
        await updateTax(existingTaxId, payload);
      } else {
        await addTax(payload);
      }
      navigate("/settings/tax-slab");
    } catch (err) {
      console.error("Failed to save tax slab:", err.message);
    }
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Tax Slabs", path: "/tax/tax-slab" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Tax Slab">
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={150}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="CGST"
                    value={cgst}
                    onChange={(e) => setCgst(e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="SGST"
                    value={sgst}
                    onChange={(e) => setSgst(e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="IGST"
                    value={igst}
                    onChange={(e) => setIgst(e.target.value)}
                    required
                  />
                </Grid>
              </Grid>
                <Button color="primary" variant="contained" type="submit" sx={{ mt: 3 }}>
                  <Icon>send</Icon>
                  <span style={{ paddingLeft: 8, textTransform: "capitalize" }}>Submit</span>
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 3 , ml: 2}}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
            </form>
          )}
        </SimpleCard>
      </Stack>
    </Container>
  );
}
