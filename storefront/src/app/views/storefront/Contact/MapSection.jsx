// src/components/MapSection.jsx
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const MapSection = () => (
  <Box sx={{ mb: 10 }}>
    <Typography variant="h4" sx={{ textAlign: "center", mb: 4, fontWeight: 700 }}>
      Find Us On Map
    </Typography>
    <Paper elevation={2} sx={{ p: 2, borderRadius: 3, height: 400 }}>
      <Box sx={{ width: "100%", height: "100%", borderRadius: 2, overflow: "hidden" }}>
        <iframe
          title="Our Location"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=..."
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </Paper>
  </Box>
);

export default MapSection;
