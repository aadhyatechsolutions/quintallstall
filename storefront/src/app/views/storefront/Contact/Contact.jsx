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
      <Paper
        elevation={3}
        sx={{
          background: "linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)",
          borderRadius: 4,
          p: { xs: 4, md: 6 },
          mb: 8,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          Get In Touch
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 700, mx: "auto" }}
        >
          We'd love to hear from you — whether it's an inquiry, a collaboration
          idea, or support you need.
        </Typography>
      </Paper>

      {/* Contact Form & Info */}
      <Grid container spacing={5} sx={{ mb: 10 }} columns={{ xs: 12, md: 12 }}>
        {/* Contact Form */}
        <Grid sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <Paper
            elevation={2}
            sx={{
              p: { xs: 4, md: 5 },
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Send Us a Message
            </Typography>
            <Divider sx={{ width: 64, height: 4, bgcolor: "#b6131a", mb: 4 }} />

            <Grid container spacing={3} columns={{ xs: 12 }}>
              <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                <TextField
                  label="Your Name"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "#b6131a" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4, md: 4 }} >
                <TextField
                  label="Email Address"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: "#b6131a" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                <TextField
                  label="Subject"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Subject sx={{ color: "#b6131a" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid sx={{ width: "100%" }}>
                <TextField
                  label="Your Message"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              <Grid sx={{ gridColumn: "span 12" }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRightAlt />}
                  sx={{
                    borderRadius: 3,
                    px: 6,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    background: "#b6131a",
                  }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Contact Info */}
        <Grid
          sx={{ gridColumn: { width: "100%", xs: "span 12", md: "span 6" } }}
        >
          <Paper
            elevation={2}
            sx={{
              p: { xs: 4, md: 5 },
              borderRadius: 3,
              background: "linear-gradient(135deg, #fce4ec 0%, #fff1f1 100%)",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              gutterBottom
              sx={{ textAlign: "center" }}
            >
              Contact Information
            </Typography>

            <Divider
              sx={{
                width: 64,
                height: 4,
                bgcolor: "secondary.main",
                mb: 4,
                mx: "auto",
                borderRadius: 2,
              }}
            />

            <Grid container spacing={4} columns={{ xs: 12 }}>
              {/* Phone */}
              <Grid
                sx={{
                  gridColumn: { xs: "span 12", sm: "span 6", md: "span 12" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", p: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                    <Phone />
                  </Avatar>
                  <Box>
                    <Typography fontWeight={600}>Phone</Typography>
                    <Typography color="text.secondary">
                      +91-7778999105
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Email */}
              <Grid
                sx={{
                  gridColumn: { xs: "span 12", sm: "span 6", md: "span 12" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", p: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                    <Email />
                  </Avatar>
                  <Box>
                    <Typography fontWeight={600}>Email</Typography>
                    <Typography color="text.secondary">
                      info@quintalstall.com
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Address */}
              <Grid sx={{ gridColumn: "span 12" }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", p: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                    <LocationOn />
                  </Avatar>
                  <Box>
                    <Typography fontWeight={600}>Our Office</Typography>
                    <Typography color="text.secondary">
                      APMC Market Complex, Sector 19
                    </Typography>
                    <Typography color="text.secondary">
                      Ahmedabad  - 380001
                    </Typography>
                    <Typography color="text.secondary">
                      Gujarat, India
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Map Section */}
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
    </Container>
  );
};

export default Contact;
