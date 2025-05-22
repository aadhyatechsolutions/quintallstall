import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const officeLocation = {
  lat: 23.020243,
  lng: 72.579743,
};

const mapsUrl = `https://www.google.com/maps?q=${officeLocation.lat},${officeLocation.lng}&z=17`;

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
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={officeLocation}
            zoom={15}
          >
            <Marker position={officeLocation} />
          </GoogleMap>
        </Box>
      </Paper>
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Larger Map
        </Button>
      </Box>
    </Box>
  );
};

export default MapSection;
