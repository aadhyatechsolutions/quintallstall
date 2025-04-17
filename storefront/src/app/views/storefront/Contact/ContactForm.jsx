// src/components/ContactForm.jsx
import React from 'react';
import { Paper, Typography, Divider, TextField, Button, Grid } from '@mui/material';

const ContactForm = () => (
  <Paper elevation={2} sx={{ p: { xs: 4, md: 5 }, borderRadius: 3 }}>
    <Typography variant="h4" fontWeight={700} gutterBottom>
      Send Us a Message
    </Typography>
    <Divider sx={{ width: 64, height: 4, bgcolor: "#b6131a", mb: 4 }} />
    {/* Add form fields */}
    <Grid container spacing={3} columns={{ xs: 12 }}>
      <Grid item xs={12}>
        <TextField label="Your Name" fullWidth variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Email Address" fullWidth variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Subject" fullWidth variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Your Message" fullWidth multiline rows={4} variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" size="large" sx={{ borderRadius: 3, px: 6, py: 1.5, textTransform: "none", fontWeight: 600, background: "#b6131a" }}>
          Send Message
        </Button>
      </Grid>
    </Grid>
  </Paper>
);

export default ContactForm;
