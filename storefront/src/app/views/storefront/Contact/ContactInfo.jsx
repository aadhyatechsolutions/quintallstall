import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  WhatsApp,
  Schedule,
} from "@mui/icons-material";

const ContactInfo = () => {
  const contactItems = [
    {
      icon: <Phone />,
      title: "Phone",
      content: "+91-7778999105",
      action: {
        text: "Call Now",
        href: "tel:+917778999105",
      },
    },
    {
      icon: <Email />,
      title: "Email",
      content: "info@quintalstall.com",
      action: {
        text: "Send Email",
        href: "mailto:info@quintalstall.com",
      },
    },
    // {
    //   icon: <WhatsApp />,
    //   title: "WhatsApp",
    //   content: "+91-7778999105",
    //   action: {
    //     text: "Message Us",
    //     href: "https://wa.me/917778999105",
    //   },
    // },
    {
      icon: <LocationOn />,
      title: "Our Office",
      content: [
        "APMC Market Complex, Sector 19",
        "Ahmedabad - 380001",
        "Gujarat, India",
      ],
    },
    // {
    //   icon: <Schedule />,
    //   title: "Working Hours",
    //   content: [
    //     "Monday - Saturday: 9:00 AM - 8:00 PM",
    //     "Sunday: 10:00 AM - 4:00 PM",
    //   ],
    // },
  ];

  return (
    <Paper
      elevation={4}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        background: "linear-gradient(135deg, #f9f9ff 0%, #f0f4ff 100%)",
        border: "1px solid rgba(145, 158, 171, 0.12)",
        boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        maxWidth: "auto",
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        sx={{
          textAlign: "center",
          color: "primary.main",
          fontSize: { xs: "1.8rem", md: "2.125rem" },
        }}
      >
        Contact Information
      </Typography>

      <Divider
        sx={{
          width: 80,
          height: 4,
          bgcolor: "secondary.main",
          mb: 4,
          mx: "auto",
          borderRadius: 2,
          opacity: 0.8,
        }}
      />

      <Grid container spacing={3}>
        {contactItems.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                p: 2,
                height: "100%",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#b6131a",
                  mr: 2,
                  color: "#fff",
                  width: 44,
                  height: 44,
                }}
              >
                {item.icon}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  gutterBottom
                  sx={{ color: "text.primary" }}
                >
                  {item.title}
                </Typography>

                {Array.isArray(item.content) ? (
                  item.content.map((line, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: i === item.content.length - 1 ? 0 : 0.5 }}
                    >
                      {line}
                    </Typography>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: item.action ? 1.5 : 0 }}
                  >
                    {item.content}
                  </Typography>
                )}

                {item.action && (
                  <Button
                    variant="outlined"
                    size="small"
                    href={item.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      mt: 1,
                      textTransform: "none",
                      borderWidth: 1,
                      "&:hover": {
                        borderWidth: 1,
                        borderColor: "#b6131a",
                      },
                    }}
                  >
                    {item.action.text}
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ContactInfo;
