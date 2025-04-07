import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import PropTypes from "prop-types";

// Market data with consistent structure
const MARKETS = [
  {
    id: 1,
    name: "Sardar Patel",
    location: "Market Yard-Jamalpur",
    image: "assets/images/apmc/apmc-1.jpg",
  },
  {
    id: 2,
    name: "Kalupur",
    location: "Vegetable Market",
    image: "assets/images/apmc/apmc-2.jpg",
  },
  {
    id: 3,
    name: "Jamalpur Flower",
    location: "Market",
    image: "assets/images/apmc/apmc-3.jpg",
  },
  {
    id: 4,
    name: "Naroda Fruits",
    location: "Market",
    image: "assets/images/apmc/apmc-4.jpg",
  },
];

// Memoized MarketButton following same pattern as CategoryButton
const MarketButton = React.memo(({ market, onClick, isActive }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      borderRadius: 2,
      boxShadow: isActive ? 3 : 1,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: 4,
        "& .market-image": {
          transform: "scale(1.05)",
        },
      },
    }}
  >
    <Button
      onClick={() => onClick?.(market.id)}
      aria-label={`View ${market.name}`}
      sx={{
        width: "100%",
        height: "100%",
        p: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        component="img"
        src={market.image}
        alt={market.name}
        className="market-image"
        sx={{
          width: "100%",
          height: 120,
          objectFit: "cover",
          transition: "transform 0.3s ease",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      />
      <Box
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: isActive ? "primary.main" : "text.primary",
          }}
        >
          {market.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            mt: 0.5,
          }}
        >
          {market.location}
        </Typography>
      </Box>
    </Button>
  </Box>
));

MarketButton.propTypes = {
  market: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

const APMCMarketGrid = ({
  title = "Our APMC",
  markets = MARKETS,
  onMarketClick = () => {},
  selectedMarket = null,
}) => {
  if (!markets?.length) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          mb: 6,
          color: "text.primary",
          fontSize: { xs: "1.8rem", sm: "2.2rem" },
          position: "relative",
          "&:after": {
            content: '""',
            display: "block",
            width: 80,
            height: 4,
            backgroundColor: "primary.main",
            margin: "16px auto 0",
            borderRadius: 2,
          },
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 4,
          mb: 6,
        }}
      >
        {markets.map((market) => (
          <MarketButton
            key={market.id}
            market={market}
            onClick={onMarketClick}
            isActive={selectedMarket === market.id}
          />
        ))}
      </Box>
    </Container>
  );
};

APMCMarketGrid.propTypes = {
  title: PropTypes.string,
  markets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  onMarketClick: PropTypes.func,
  selectedMarket: PropTypes.number,
};

export default APMCMarketGrid;
