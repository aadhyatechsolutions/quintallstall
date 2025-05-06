import React from 'react';
import { Box, Button, Typography, Grid, Card, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Reusable OfferCard component
const OfferCard = ({ title, subtitle, description, image, buttonLabel, buttonColor, buttonHoverColor, linkTo }) => {
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle button click
  const handleButtonClick = () => {
    navigate(linkTo); // Navigate to the provided link
  };

  return (
    <Grid size={{xs:12,sm:6,md:6}} width="100%" >
      <Card
        sx={{
          position: 'relative',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 3,
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={image}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Typography variant="h4" sx={{ color: '#ff5252', fontWeight: 'bold', mb: 1 }}>
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
            color={buttonColor}
            onClick={handleButtonClick} // Add onClick handler
            sx={{
              mt: 2,
              width: 'fit-content',
              fontWeight: 600,
              px: 3,
              py: 1,
              fontSize: '1rem',
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: 2,
              '&:hover': {
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
  const offerData = [
    {
      title: 'ADVANCE ORDER',
      subtitle: 'Buy ahead of other sellers',
      description: 'Secure your items before they sell out',
      image: '/assets/images/banner/Exotic-Fruits-Veggies.jpg',
      buttonLabel: 'Arriving Tomorrow',
      buttonColor: 'error',
      buttonHoverColor: '#d32f2f',
      linkTo: '/shop', 
    },
    {
      title: 'SPECIAL OFFER',
      subtitle: 'Limited Time Only',
      description: 'Exclusive deals you won\'t find elsewhere',
      image: '/assets/images/banner/1730294771Herbs-Seasonings.png',
      buttonLabel: 'Shop Now',
      buttonColor: 'error',
      buttonHoverColor: '#d32f2f',
      linkTo: '/shop', 
    },
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6, px: 2, backgroundColor: '#fff' }}>
      <Grid container spacing={4} justifyContent="center" maxWidth="none" width="100%">
        {offerData.map((offer, index) => (
          <OfferCard key={index} {...offer} />
        ))}
      </Grid>
    </Box>
  );
};

export default OfferCards;
