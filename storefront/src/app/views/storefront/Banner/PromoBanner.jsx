import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const defaultBannerData = {
  backgroundImage: "assets/images/banner/banner.png",
  mainText: "FREE GIFT ANY ORDER",
  discountText: "70% OFF",
  buttonText: "SHOP NOW",
  textColor: "#ffffff",
  discountColor: "#ffeb3b",
  buttonColor: "#ff5722",
  buttonHoverColor: "#e64a19",
};

const PromoBanner = () => {
  const bannerData = defaultBannerData;
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products"); 
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "200px", sm: "300px", md: "400px" },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        mb: 4,
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={bannerData.backgroundImage}
        alt="Promotional Banner"
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 1,
        }}
      />

      {/* Text Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          color: bannerData.textColor,
          p: 3,
          maxWidth: "800px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "2rem",
              sm: "3rem",
              md: "4rem",
            },
            lineHeight: 1.2,
            textTransform: "uppercase",
            mb: 2,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {bannerData.mainText}
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "3rem",
              sm: "4rem",
              md: "5rem",
            },
            lineHeight: 1,
            color: bannerData.discountColor,
            textShadow: "3px 3px 6px rgba(0,0,0,0.7)",
            mb: 3,
          }}
        >
          {bannerData.discountText}
        </Typography>

        {/* <Button
          variant="contained"
          size="large"
          onClick={handleShopNow}
          sx={{
            px: 6,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: "bold",
            backgroundColor: bannerData.buttonColor,
            color: "white",
            borderRadius: "4px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: bannerData.buttonHoverColor,
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {bannerData.buttonText}
        </Button> */}
      </Box>
    </Box>
  );
};

export default PromoBanner;
