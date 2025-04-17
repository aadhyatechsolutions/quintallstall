// src/components/ContactInfo.jsx
import React from 'react';
import { Paper, Typography, Divider, Box, Avatar } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';

const ContactInfo = () => (
  <Paper elevation={2} sx={{ p: { xs: 4, md: 5 }, borderRadius: 3, background: "linear-gradient(135deg, #fce4ec 0%, #fff1f1 100%)" }}>
    <Typography variant="h4" fontWeight={700} gutterBottom sx={{ textAlign: "center" }}>
      Contact Information
    </Typography>
    <Divider sx={{ width: 64, height: 4, bgcolor: "#b6131a", mb: 4, mx: "auto", borderRadius: 2 }} />
    {/* Add contact information */}
    <Box sx={{ display: "flex", alignItems: "flex-start", p: 2 }}>
      <Avatar sx={{ bgcolor: "#b6131a", mr: 2 }}><Phone /></Avatar>
      <Box>
        <Typography fontWeight={600}>Phone</Typography>
        <Typography color="text.secondary">+91 9876543210</Typography>
        <Typography color="text.secondary">+91 1234567890</Typography>
      </Box>
    </Box>
    {/* Repeat for Email and Address */}
  </Paper>
);

export default ContactInfo;
