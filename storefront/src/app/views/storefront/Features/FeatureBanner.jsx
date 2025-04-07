import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const FeatureBanner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
        px: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Grid container spacing={2} sx={{ maxWidth: "1000px" }}>
        {/* 24x7 Service */}
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src="/icons/24x7-icon.png"
              alt="24/7 Service"
              sx={{ width: "60px", height: "60px", mb: 2 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              24 x 7 Service
            </Typography>
            <Typography variant="body2">Online Service For 24 x 7</Typography>
          </Box>
        </Grid>

        {/* Online Pay */}
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src="/icons/payment-icon.png"
              alt="Online Payment"
              sx={{ width: "60px", height: "60px", mb: 2 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Online Pay
            </Typography>
            <Typography variant="body2">Online Payment Available</Typography>
          </Box>
        </Grid>

        {/* Festival Offer */}
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src="/icons/offer-icon.png"
              alt="Festival Offer"
              sx={{ width: "60px", height: "60px", mb: 2 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Festival Offer
            </Typography>
            <Typography variant="body2">Super Sale Upto 50% off</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeatureBanner;
