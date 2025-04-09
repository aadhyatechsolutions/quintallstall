import { Box, Typography } from "@mui/material";

const NavLogo = ({ logo, altText = "Quintal Stall" }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      flexShrink: 0,
      mr: { md: 4, lg: 6 },
    }}
  >
    {logo ? (
      <Box
        component="a"
        href="/"
        sx={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          height: { xs: "40px", sm: "50px", md: "60px" },
          "& img": {
            height: "100%",
            width: "auto",
            objectFit: "contain",
          },
        }}
      >
        <img src={logo} alt={altText} />
      </Box>
    ) : (
      <>
        <Typography
          variant="h4"
          component="a"
          href="/home"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
            mr: 1,
            lineHeight: 1,
            fontSize: {
              xs: "1.5rem",
              sm: "1.75rem",
              md: "2rem",
              lg: "2.25rem",
            },
          }}
        >
          QUINTAL
        </Typography>
        <Typography
          variant="h4"
          component="a"
          href="/home"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 300,
            color: "inherit",
            textDecoration: "none",
            lineHeight: 1,
            fontSize: {
              xs: "1.5rem",
              sm: "1.75rem",
              md: "2rem",
              lg: "2.25rem",
            },
          }}
        >
          STALL
        </Typography>
      </>
    )}
  </Box>
);

export default NavLogo;
