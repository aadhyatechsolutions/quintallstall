import React from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  Fade,
  Grow,
  Button,
} from "@mui/material";

const YourOrder = () => {
  const theme = useTheme();

  const customTheme = {
    primary: "#b6131a",
    secondary: "#2b4a05",
    lightBg: "#f9f5f5",
    darkBg: "#0f0505",
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Fade in timeout={1000}>
        <Box
          textAlign="center"
          sx={{
            p: 4,
            backgroundColor:
              theme.palette.mode === "dark"
                ? customTheme.darkBg
                : customTheme.lightBg,
            borderRadius: 4,
            boxShadow: 3,
            width: "100%",
          }}
        >
          <Grow in timeout={1200}>
            <Typography
              variant="h3"
              fontWeight={700}
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                background: `linear-gradient(45deg, ${customTheme.primary}, ${customTheme.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Coming Soon Your Order Page
            </Typography>
          </Grow>

          <Fade in timeout={1600}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
                fontSize: "1.1rem",
                mb: 4,
              }}
            >
              We're working hard to launch something amazing. Stay tuned!
            </Typography>
          </Fade>

          {/* <Grow in timeout={2000}>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                px: 4,
                py: 1,
                backgroundColor: customTheme.primary,
                "&:hover": {
                  backgroundColor: "#8d0e13",
                },
              }}
            >
              Notify Me
            </Button>
          </Grow> */}
        </Box>
      </Fade>
    </Container>
  );
};

export default YourOrder;
