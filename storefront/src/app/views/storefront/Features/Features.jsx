import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import {
  DeliveryDining,
  AccessTime,
  CreditCard,
  CardGiftcard,
} from "@mui/icons-material";

const features = [
  {
    icon: <DeliveryDining sx={{ fontSize: 40 }} />,
    title: "Free Shipping",
    description: "Free Shipping world wide",
  },
  {
    icon: <AccessTime sx={{ fontSize: 40 }} />,
    title: "24 x 7 Service",
    description: "Online Service For 24 x 7",
  },
  {
    icon: <CreditCard sx={{ fontSize: 40 }} />,
    title: "Online Pay",
    description: "Online Payment Available",
  },
  {
    icon: <CardGiftcard sx={{ fontSize: 40 }} />,
    title: "Festival Offer",
    description: "Super Sale Upto 50% off",
  },
];

const Features = () => {
  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 4 }, backgroundColor: "#f9f9f9" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        {features.map((feature, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", sm: "30%", lg: "20%" },
              borderRadius: "12px",
              backgroundColor: "#f5f5f5",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#a81724",
                transform: "translateY(-4px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                "& .feature-icon, & .feature-text, & .subtitle1 ,& .body2": {
                  color: "#fff",
                },
              },
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {/* Icon with default color and hover effect */}
              <Box
                className="feature-icon"
                sx={{ color: "#a81724", transition: "color 0.3s" }}
              >
                {feature.icon}
              </Box>
              {/* Text with default color and hover effect */}
              <Box className="feature-text" sx={{ transition: "color 0.3s" }}>
                <Typography
                  className="subtitle1"
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  className="body2"
                  variant="body2"
                  sx={{ color: "#666" }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Features;
