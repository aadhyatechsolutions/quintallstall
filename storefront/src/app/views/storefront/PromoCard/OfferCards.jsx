import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  Container,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSpecialOffers } from "../../../../hooks/useSpecialOffers";
import { apiConfig } from "../../../../config";
// Reusable OfferCard component
const OfferCard = ({
  title,
  subtitle,
  description,
  image,
  buttonLabel,
  buttonColor,
  buttonHoverColor,
  linkTo,
}) => {
  const navigate = useNavigate();
  // Function to handle button click
  const handleButtonClick = () => {
    navigate(linkTo);
  };

  return (
    <Grid size={{ xs: 12, sm: 6, md: 6 }} width="100%">
      <Card
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 3,
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={image}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "#ff5252", fontWeight: "bold", mb: 1 }}
          >
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {description}
          </Typography>
          <Button
            variant="contained"
            onClick={handleButtonClick}
            sx={{
              mt: 2,
              width: "fit-content",
              fontWeight: 600,
              px: 3,
              py: 1,
              fontSize: "1rem",
              borderRadius: 2,
              textTransform: "none",
              boxShadow: 2,
              backgroundColor: buttonColor,
              "&:hover": {
                backgroundColor: buttonHoverColor,
              },
            }}
          >
            {buttonLabel}
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

// Main OfferCards component
const OfferCards = () => {
  const { data, isLoading, isError } = useSpecialOffers();
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="body1" color="error">
          Failed to load special offers.
        </Typography>
      </Container>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 6,
        px: 2,
        backgroundColor: "#fff",
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="center"
        maxWidth="none"
        width="100%"
      >
        {data.map((offer) => (
          <OfferCard
            key={offer.id}
            title={offer.title}
            subtitle={offer.second_title}
            description={offer.short_description}
            image={`${apiConfig.MEDIA_URL}${offer.image}`}
            buttonLabel={offer.shop_button_text}
            buttonColor="#a81724"
            buttonHoverColor="#030101"
            linkTo="/shop"
          />
        ))}
      </Grid>
    </Box>
  );
};

export default OfferCards;
