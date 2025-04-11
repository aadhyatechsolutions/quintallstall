import React from "react";
import Slider from "react-slick";
import { useCategories } from "../../../../hooks/useCategories";
import { Box, Typography, CircularProgress, Alert, Paper } from "@mui/material";
import { apiConfig } from "../../../../config";
const CategoriesList = () => {
  const { data: categories = [], isLoading, error } = useCategories();

  if (isLoading)
    return <CircularProgress sx={{ display: "block", my: 4, mx: "auto" }} />;
  if (error)
    return (
      <Alert severity="error" sx={{ my: 4 }}>
        Error loading categories.
      </Alert>
    );
  if (categories.length === 0)
    return (
      <Typography variant="body1" align="center" sx={{ my: 4 }}>
        No categories available.
      </Typography>
    );

  const sliderSettings = {
    className: "center",
    infinite: false,
    swipeToSlide: true,
    centerPadding: "10px",
    slidesToShow: 12,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 8.5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 7.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6.5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4.5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3.3,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2.8,
        },
      },
    ],
    afterChange: (index) => {
      console.log(`Slider changed to: ${index + 1}`);
    },
  };

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: "center", pb: "20px" }}
      >
        Explore Categories
      </Typography>
      <Box
        sx={{
          "& .slick-list": { mb: 5 },
          "& .slick-slide": { pb: 2 },
        }}
      >
        <Slider {...sliderSettings}>
          {categories.map((category) => (
            <Box key={category.id} px={1}>
              <Paper
                elevation={2}
                sx={{
                  minWidth: 90,
                  width: 100,
                  flexShrink: 0,
                  p: 1,
                  borderRadius: 1,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 2,
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: 60,
                    mb: 2,
                    borderRadius: 1,
                    backgroundColor: "grey.100",
                    backgroundImage: `url(${apiConfig.MEDIA_URL}${category.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Typography
                  variant="caption"
                  noWrap
                  sx={{ fontWeight: 500, fontSize: "0.75rem" }}
                >
                  {category.name}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default CategoriesList;
