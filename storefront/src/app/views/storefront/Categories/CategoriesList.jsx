import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  Alert,
  Paper,
  Skeleton,
} from "@mui/material";
import { useCategories } from "../../../../hooks/useCategories";
import { apiConfig } from "../../../../config";

const cardStyle = {
  minWidth: 90,
  width: 130,
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
};

const CategoriesList = ({ selectedCategoryId, onCategoryClick }) => {
  const sliderRef = useRef();
  const { data: categories = [], isLoading, error } = useCategories();

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
        sliderRef.current.innerSlider.onWindowResized();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliderSettings = {
    infinite: false,
    swipeToSlide: true,
    arrows: false,
    slidesToShow: 10,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 7 } },
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 992, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
      { breakpoint: 360, settings: { slidesToShow: 1.5 } },
    ],
  };

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center", pb: 2 }}>
        Explore Categories
      </Typography>

      {error && (
        <Alert severity="error" sx={{ my: 4 }}>
          Error loading categories.
        </Alert>
      )}

      {isLoading ? (
        <Box display="flex" gap={2} px={2} py={2}>
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={100}
              height={100}
              sx={{ borderRadius: 1 }}
            />
          ))}
        </Box>
      ) : categories.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ my: 4 }}>
          No categories available.
        </Typography>
      ) : (
        <Box
          sx={{
            "& .slick-list": {
              px: { xs: 0, sm: 1 },
              mb: { xs: 2, sm: 3 },
            },
            "& .slick-slide": {
              px: 0.5,
              pb: 2,
              display: "flex !important",
              justifyContent: "center",
            },
          }}
        >
          <Slider {...sliderSettings} ref={sliderRef}>
            {categories.map((category) => {
              const isActive = selectedCategoryId === category.id;
              return (
                <Box key={category.id} px={1}>
                  <Paper
                    elevation={isActive ? 4 : 2}
                    sx={{
                      ...cardStyle,
                      border: isActive ? "2px solid #b6131a" : "1px solid #eee",
                      backgroundColor: isActive
                        ? "rgba(182, 19, 26, 0.08)"
                        : "#fff",
                    }}
                    onClick={() =>
                      onCategoryClick(
                        isActive ? null : category.id
                      )
                    }
                    role="button"
                    aria-label={`View category: ${category.name}`}
                  >
                    <Box
                      component="img"
                      src={`${apiConfig.MEDIA_URL}${category.image}`}
                      alt={category.name}
                      sx={{
                        width: "100%",
                        height: 60,
                        mb: 2,
                        borderRadius: 1,
                        objectFit: "cover",
                        backgroundColor: "grey.100",
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
              );
            })}
          </Slider>
        </Box>
      )}
    </Box>
  );
};

export default CategoriesList;
