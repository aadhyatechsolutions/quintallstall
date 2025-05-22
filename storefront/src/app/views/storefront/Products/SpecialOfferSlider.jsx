import React from "react";
import Slider from "react-slick";
import { Box, Typography, Container, IconButton } from "@mui/material";
import ProductCard from "./ProductCard";
import { useProducts } from "../../../../hooks/useProducts";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Arrows
const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      right: -20,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      backgroundColor: "#fff",
      color: "#a81724",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      "&:hover": {
        backgroundColor: "#f5f5f5",
        color: "#8c0d1a",
      },
    }}
  >
    <ArrowForwardIosIcon fontSize="small" />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      left: -20,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      backgroundColor: "#fff",
      color: "#a81724",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      "&:hover": {
        backgroundColor: "#f5f5f5",
        color: "#8c0d1a",
      },
    }}
  >
    <ArrowBackIosIcon fontSize="small" />
  </IconButton>
);

const SpecialOfferSlider = () => {
  const { data: products = [], isLoading } = useProducts();

  // Filter only products with a valid discount price
  const discountedProducts = products.filter(
    (p) =>
      p.status === "active" &&
      p.discount_price &&
      parseFloat(p.discount_price) > 0
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          arrows: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 6, px: { xs: 2, sm: 3 }, position: "relative" }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 4,
          color: "#333",
          fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" },
          position: "relative",
          "&:after": {
            content: '""',
            display: "block",
            width: "80px",
            height: "3px",
            backgroundColor: "#a81724",
            margin: "12px auto 0",
            borderRadius: "3px",
          },
        }}
      >
        Special Offers
      </Typography>

      {!isLoading && discountedProducts.length > 0 && (
        <Box
          sx={{
            position: "relative",
            "& .slick-slide": {
              padding: "0 8px",
              boxSizing: "border-box",
            },
            "& .slick-list": {
              margin: "0 -8px",
            },
          }}
        >
          <Slider {...settings}>
            {discountedProducts.map((product) => (
              <Box key={product.id} sx={{ paddingBottom: "10px" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <ProductCard product={product} isSpecialOffer />
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      )}
    </Container>
  );
};

export default SpecialOfferSlider;
