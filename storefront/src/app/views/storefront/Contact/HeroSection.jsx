// src/components/HeroSection.jsx
import React from 'react';
import { Paper, Typography } from '@mui/material';

const HeroSection = () => (
  <Paper elevation={3} sx={{ background: "linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)", borderRadius: 4, p: { xs: 4, md: 6 }, mb: 8, textAlign: "center" }}>
    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
      Get In Touch
    </Typography>
    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: "auto" }}>
      We'd love to hear from you — whether it's an inquiry, a collaboration idea, or support you need.
    </Typography>
  </Paper>
);

export default HeroSection;
