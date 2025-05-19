import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const MapSection = () => {
  return (
    <Box sx={{ mb: 10 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 4, fontWeight: 700 }}
      >
        Find Us On Map
      </Typography>
      <Paper elevation={2} sx={{ p: 2, borderRadius: 3, height: 400 }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <iframe
            title="Our Location"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.575588858094!2d72.99704677521152!3d19.12567694943059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1c5f26b3a1b%3A0x5a66a9f0b5f7e4f2!2sAPMC%20Market%2C%20Vashi%2C%20Navi%20Mumbai%2C%20Maharashtra%20400703!5e0!3m2!1sen!2sin!4v1712570713625!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Paper>
    </Box>
  );
};

export default MapSection;
