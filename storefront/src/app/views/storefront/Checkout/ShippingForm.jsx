import React from "react";
import { Grid, TextField } from "@mui/material";

const ShippingForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField label="Full Name" fullWidth required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Phone Number" fullWidth required />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Address" fullWidth multiline rows={3} required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="City" fullWidth required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Postal Code" fullWidth required />
      </Grid>
    </Grid>
  );
};

export default ShippingForm;
