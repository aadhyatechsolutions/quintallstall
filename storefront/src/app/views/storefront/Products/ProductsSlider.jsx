import React from "react";
import { apiConfig } from "../../../../config";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useProducts } from "../../../../hooks/useProducts";
import { useCartStore } from "../../../../store/cartStore";
import { handleAddToCartWithAuthCheck } from "../../../../utils/authCartHandler";
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: { xs: "-15px", sm: "-25px", md: "-35px" },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        color: "#a81724",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 1)",
          color: "#8c0d1a",
        },
      }}
    >
      <ArrowForwardIosIcon fontSize="small" />
    </IconButton>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: { xs: "-15px", sm: "-25px", md: "-35px" },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        color: "#a81724",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 1)",
          color: "#8c0d1a",
        },
      }}
    >
      <ArrowBackIosIcon fontSize="small" />
    </IconButton>
  );
};

const ProductSlider = () => {
  const { data: products = [], isLoading, isError } = useProducts();
  const addToCart = useCartStore((state) => state.addToCart);
  const handleAddToCart = (product) => {
    handleAddToCartWithAuthCheck({
      product,
      quantity: 1,
      addToCart,
      replace: false,
    });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 5 } },
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 400, settings: { slidesToShow: 2 } },
    ],
  };

  if (isLoading) {
    return (
      <Box textAlign="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" py={6}>
        <Typography color="error">Failed to load products</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 1, sm: 2 },
        width: "100%",
        mx: "auto",
        position: "relative",
        "& .slick-slide": {
          px: { xs: 0.5, sm: 1 },
        },
        "& .slick-list": {
          padding: "10px 0px 10px 0px",
        },
      }}
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
        Our Products
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "1800px",
          mx: "auto",
          px: { xs: 0, sm: 2, md: 4 },
        }}
      >
        <Slider {...settings} aria-label="Product carousel">
          {products.map((product) => (
            <Box key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  mx: { xs: 0.5, sm: 1 },
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                  },
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {product.discount && (
                  <Chip
                    label={product.discount}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      backgroundColor: "#a81724",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "0.7rem",
                    }}
                  />
                )}
                {product.tag && (
                  <Chip
                    label={product.tag}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: product.discount ? 48 : 12,
                      left: 12,
                      backgroundColor: "#333",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "0.7rem",
                    }}
                  />
                )}

                <CardMedia
                  component="img"
                  height="160"
                  image={`${apiConfig.MEDIA_URL}${product.image}`}
                  alt={product.name}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    px: 2,
                    pb: "16px !important",
                    pt: 2,
                  }}
                >
                  <Stack spacing={1.5} alignItems="center">
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#333",
                        minHeight: "48px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        color: "#a81724",
                        fontSize: "1.1rem",
                      }}
                    >
                      ₹{product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        mt: 1,
                        width: "100%",
                        maxWidth: "160px",
                        backgroundColor: "#a81724",
                        "&:hover": {
                          backgroundColor: "#8c0d1a",
                          boxShadow: "0 2px 10px rgba(168, 23, 36, 0.4)",
                        },
                        borderRadius: "8px",
                        py: 1,
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        transition: "all 0.3s",
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default ProductSlider;
