import React from "react";
import { Grid, Paper, Typography, Divider, Avatar, Box } from "@mui/material";
import { Phone, Email, LocationOn } from "@mui/icons-material";

const ContactInfo = () => {
  return (
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

      <Grid container spacing={4}>
        {/* Phone */}
        <Grid item xs={12} sm={6} md={12}>
          <Box sx={{ display: "flex", alignItems: "flex-start", p: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
              <Phone />
            </Avatar>
            <Box>
              <Typography fontWeight={600}>Phone</Typography>
              <Typography color="text.secondary">+91-7778999105</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6} md={12}>
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
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "flex-start", p: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
              <LocationOn />
            </Avatar>
            <Box>
              <Typography fontWeight={600}>Our Office</Typography>
              <Typography color="text.secondary">
                APMC Market Complex, Sector 19
              </Typography>
              <Typography color="text.secondary">Ahmedabad - 380001</Typography>
              <Typography color="text.secondary">Gujarat, India</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ContactInfo;
