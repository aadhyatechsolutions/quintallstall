import React from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Button,
  Divider,
  TextField,
  InputAdornment,
  Avatar,
  Stack,
  Fade,
} from "@mui/material";
import {
  Home as HomeIcon,
  ArrowRightAlt,
  Phone,
  Email,
  LocationOn,
  Person,
  Subject,
} from "@mui/icons-material";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import MapSection from "./MapSection";
import HeroSection from "./HeroSection";

// No imports changed — using same component and icon imports

const Contact = () => {
  const customTheme = {
    primary: "#b6131a", // Deep red
    secondary: "#2b4a05", // Dark green
    lightBg: "#f9f5f5", // Very light red
    darkBg: "#0f0505", // Very dark red
    lightSecondaryBg: "#f5f7f3", // Very light green
    darkSecondaryBg: "#050805", // Very dark green
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
      <Fade in timeout={800}>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              background: `linear-gradient(45deg, ${customTheme.primary} 30%, ${customTheme.secondary} 90%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              letterSpacing: "-0.5px",
            }}
          >
            Contact Us
          </Typography>
          {/* <Divider
            sx={{
              width: 100,
              height: 4,
              mx: "auto",
              background: `linear-gradient(90deg, ${customTheme.primary}, ${customTheme.secondary})`,
              borderRadius: 2,
            }}
          /> */}
        </Box>
      </Fade>
      {/* Hero Section */}
      <HeroSection />

      {/* Contact Form & Info */}
      <Grid container spacing={5} sx={{ mb: 10 }} columns={{ xs: 12, md: 12 }}>
        {/* Contact Form */}
        <ContactForm />

        {/* Contact Info */}
        <Grid
          sx={{ gridColumn: { width: "100%", xs: "span 12", md: "span 6" } }}
        >
          <ContactInfo />
        </Grid>
      </Grid>

      {/* Map Section */}
      <MapSection />
    </Container>
  );
};

export default Contact;
