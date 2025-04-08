import React from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  useMediaQuery,
  useTheme,
  Fade,
  Grow,
  Avatar,
  Divider,
} from "@mui/material";
import aboutData from "./aboutData";

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { title, whoWeAre, vision, mission } = aboutData;

  // Custom color palette
  const customTheme = {
    primary: "#b6131a", // Deep red
    secondary: "#2b4a05", // Dark green
    lightBg: "#f9f5f5", // Very light red
    darkBg: "#0f0505", // Very dark red
    lightSecondaryBg: "#f5f7f3", // Very light green
    darkSecondaryBg: "#050805", // Very dark green
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Animated Title Section */}
      <Fade in timeout={800}>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              background: `linear-gradient(45deg, ${customTheme.primary} 30%, ${customTheme.secondary} 90%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              letterSpacing: "-0.5px",
            }}
          >
            {title}
          </Typography>
          {/* <Divider
            sx={{
              width: 100,
              height: 4,
              mx: "auto",
              background: `linear-gradient(90deg, ${customTheme.primary}, ${customTheme.secondary})`,
              borderRadius: 2,
            }}
          /> */}
        </Box>
      </Fade>

      {/* Who We Are Section */}
      <Grow in timeout={1000}>
        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{
            mb: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
              theme.palette.mode === "dark"
                ? customTheme.darkBg
                : customTheme.lightBg,
            borderRadius: 4,
            p: { xs: 3, md: 6 },
            boxShadow: 3,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              component="img"
              src={whoWeAre.image}
              alt="Who We Are"
              sx={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 4,
                boxShadow: `0 10px 30px -5px rgba(${customTheme.primary.slice(
                  4,
                  -1
                )}, 0.2)`,
                border: `1px solid ${customTheme.primary}20`,
                transition: "all 0.3s ease",
                objectFit: "contain",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: `0 15px 40px -5px rgba(${customTheme.primary.slice(
                    4,
                    -1
                  )}, 0.3)`,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Avatar
              sx={{
                bgcolor: customTheme.primary,
                color: "white",
                width: 56,
                height: 56,
                mb: 3,
                fontSize: "1.5rem",
                fontWeight: 700,
                mx: "auto",
                display: { xs: "flex", md: "inline-flex" },
              }}
            >
              1
            </Avatar>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                mb: 3,
                color: customTheme.primary,
                textAlign: { xs: "center", md: "left" },
                "&:first-letter": {
                  fontSize: "1.5em",
                },
              }}
            >
              {whoWeAre.heading}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
                fontSize: "1.1rem",
                mb: 3,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {whoWeAre.description}
            </Typography>
          </Grid>
        </Grid>
      </Grow>

      {/* Vision and Mission Cards */}
      <Box sx={{ mt: 6 }}>
        {/* Vision Card */}
        <Grow in timeout={1200}>
          <Paper
            elevation={4}
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              borderRadius: 4,
              overflow: "hidden",
              mb: 6,
              background:
                theme.palette.mode === "dark"
                  ? `linear-gradient(135deg, ${customTheme.darkSecondaryBg}, #111)`
                  : `linear-gradient(135deg, ${customTheme.lightSecondaryBg}, #fff)`,
              border: `1px solid ${customTheme.secondary}20`,
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: `0 10px 25px -5px rgba(${customTheme.secondary.slice(
                  4,
                  -1
                )}, 0.2)`,
                transform: "translateY(-5px)",
              },
            }}
          >
            <Box
              component="img"
              src={vision.image}
              alt="Vision"
              sx={{
                width: { xs: "100%", md: "45%" },
                maxHeight: isMobile ? 300 : 400,
                objectFit: "cover",
                display: "flex",
                margin: "0 auto",
                borderRight: isMobile
                  ? "none"
                  : `1px solid ${customTheme.secondary}20`,
              }}
            />
            <Box
              sx={{
                p: { xs: 4, md: 6 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: customTheme.secondary,
                    color: "white",
                    mr: 2,
                    width: 48,
                    height: 48,
                    fontSize: "1.25rem",
                    fontWeight: 700,
                  }}
                >
                  2
                </Avatar>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color={customTheme.secondary}
                >
                  {vision.title}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                }}
              >
                {vision.description}
              </Typography>
            </Box>
          </Paper>
        </Grow>

        {/* Mission Card */}
        <Grow in timeout={1500}>
          <Paper
            elevation={4}
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column-reverse" : "row",
              borderRadius: 4,
              overflow: "hidden",
              background:
                theme.palette.mode === "dark"
                  ? `linear-gradient(45deg, ${customTheme.darkBg}, #111)`
                  : `linear-gradient(45deg, ${customTheme.lightBg}, #fff)`,
              border: `1px solid ${customTheme.primary}20`,
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: `0 10px 25px -5px rgba(${customTheme.primary.slice(
                  4,
                  -1
                )}, 0.2)`,
                transform: "translateY(-5px)",
              },
            }}
          >
            <Box
              sx={{
                p: { xs: 4, md: 6 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: customTheme.primary,
                    color: "white",
                    mr: 2,
                    width: 48,
                    height: 48,
                    fontSize: "1.25rem",
                    fontWeight: 700,
                  }}
                >
                  3
                </Avatar>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color={customTheme.primary}
                >
                  {mission.title}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                }}
              >
                {mission.description}
              </Typography>
            </Box>
            <Box
              component="img"
              src={mission.image}
              alt="Mission"
              sx={{
                width: { xs: "100%", md: "45%" },
                maxHeight: isMobile ? 300 : 400,
                objectFit: "cover",
                display: "flex",
                margin: "0 auto",
                borderLeft: isMobile
                  ? "none"
                  : `1px solid ${customTheme.primary}20`,
              }}
            />
          </Paper>
        </Grow>
      </Box>
    </Container>
  );
};

export default About;
