import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button, Container, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from 'react-router-dom';

const offerImages = [
  {
    img: "/assets/images/carousel/slider-img1.png",
    title: "Weekend Special Offer",
    subtitle: "Premium Quality Vegetables",
    description: "Vegetable Shopping Made Easy",
    details: "Fresh & Top Quality Vegetables available here!",
    buttonText: "Shop Now",
  },
  {
    img: "/assets/images/carousel/slider-img2.jpg",
    title: "Summer Special",
    subtitle: "Organic Farm Products",
    description: "Farm Fresh Direct to Your Home",
    details: "Get 20% off on all organic products this weekend!",
    buttonText: "View Offers",
  },
];

// Custom arrow components with vertical centering
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: { xs: "10px", sm: "20px", md: "30px" },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        },
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: { xs: "10px", sm: "20px", md: "30px" },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        },
      }}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
}

function Carousel() {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
        },
      },
    ],
  };


  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Slider {...settings}>
        {offerImages.map((item, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              height: { xs: "70vh", sm: "80vh", md: "85vh" },
              width: "100%",
            }}
          >
            {/* Background Image */}
            <Box
              component="img"
              src={item.img}
              alt={item.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />

            {/* Content Container */}
            <Container
              maxWidth="lg"
              sx={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                color: "black",
                textAlign: "left",
                px: { xs: 4, sm: 6, md: 8, lg: 10 },
                py: 6,
                maxWidth: { xs: "100%", md: "80%", lg: "60%" },
                height: "100%",
                ml: { xs: 2, md: 6 },
                "& h6, & h3, & h5, & p": {
                  textShadow: "1px 1px 3px rgba(255,255,255,0.5)",
                },
              }}
            >
              {/* Text Content */}
              <Box sx={{ width: "100%", mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontSize: { xs: "1rem", md: "1.2rem" },
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 3,
                    fontSize: {
                      xs: "2rem",
                      sm: "2.5rem",
                      md: "3rem",
                      lg: "3.5rem",
                    },
                    lineHeight: 1.2,
                  }}
                >
                  {item.subtitle}
                </Typography>

                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    mb: 2,
                    fontSize: { xs: "1rem", md: "1.25rem" },
                    fontWeight: 400,
                  }}
                >
                  {item.description}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    color: "rgba(0,0,0,0.9)",
                  }}
                >
                  {item.details}
                </Typography>
              </Box>

              {/* Button */}
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/products')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  backgroundColor: "#a81724",
                  color: "white",
                  borderRadius: "4px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  "&:hover": {
                    backgroundColor: "#8c121d",
                  },
                }}
              >
                {item.buttonText}
              </Button>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default Carousel;
