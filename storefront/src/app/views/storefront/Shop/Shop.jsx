import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";

const shops = [
  {
    name: "Vijay",
    market: "Sardar Patel Market Yard - Jamalpur",
    color: "#b6131a",
  },
  {
    name: "Jayesh",
    market: "Sardar Patel Market Yard - Jamalpur",
    color: "#b6131a",
  },
  {
    name: "alnXkAbhkv",
    market: "Sardar Patel Market Yard - Jamalpur",
    color: "#b6131a",
  },
  {
    name: "CGRdmzqCl",
    market: "Sardar Patel Market Yard - Jamalpur",
    color: "#b6131a",
  },
  {
    name: "Nakum",
    market: "Sardar Patel Market Yard - Jamalpur",
    color: "#b6131a",
  },
  {
    name: "someone",
    market: "Sardar Patel Market Yard - Jamalpur",
    color: "#b6131a",
  },
  {
    name: "smitendra",
    market: "Sardar Patel Market Yard - Jamalpur",
    color: "#b6131a",
  },
  {
    name: "Brianclism",
    market: "Sardar Patel Market Yard - Jamalpur",
    color: "#b6131a",
  },
];

const Shop = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
      <Typography
        variant="h3"
        fontWeight={800}
        textAlign="center"
        mb={6}
        sx={{
          fontSize: { xs: "2rem", md: "2.5rem" },
          background: `linear-gradient(45deg, #b6131a 30%, #2b4a05 90%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Shop Listings
      </Typography>

      <Grid container rowSpacing={4} columnSpacing={2} justifyContent="center">
        {shops.map((shop, index) => (
          <Grid key={index}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover .shop-content": {
                  backgroundColor: "#1B3D0F",
                },
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 2,
                  height: "100%",
                  overflow: "hidden",
                  minHeight: 250,
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f3f3f3",
                    py: 4,
                  }}
                >
                  <Avatar sx={{ bgcolor: shop.color, width: 64, height: 64 }}>
                    <StoreIcon />
                  </Avatar>
                </Box>

                <Box
                  className="shop-content"
                  sx={{
                    backgroundColor: shop.color,
                    px: 2,
                    py: 2,
                    textAlign: "center",
                    color: "#fff",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={600}>
                    {shop.market}
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    {shop.name}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Shop;
