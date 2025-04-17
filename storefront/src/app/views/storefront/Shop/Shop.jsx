import React, { useEffect } from "react";
import { apiConfig } from "../../../../config";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Container,
  useMediaQuery,
  useTheme,
  Chip,
  Stack,
  Skeleton,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import { useUserStore } from "../../../../store/userStore";

const Shop = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const { users, userStatus, fetchUsers } = useUserStore();

  useEffect(() => {
    if (users.length === 0 && userStatus !== "loading") {
      fetchUsers();
    }
  }, [users, userStatus, fetchUsers]);
  

  if (userStatus === "loading") {
    return (
      <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
        <Typography variant="h3" textAlign="center" mb={6}>
          Shop Listings
        </Typography>
        <Grid container spacing={4}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (userStatus === "error") {
    return (
      <Typography align="center" mt={10} color="error">
        Failed to load shop data.
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 10 }}>
      <Typography
        variant="h3"
        fontWeight={800}
        textAlign="center"
        mb={6}
        sx={{
          fontSize: { xs: "2rem", md: "2.5rem" },
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Shop Listings
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {users.map((user) => (
          <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardMedia
                sx={{
                  height: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: theme.palette.grey[100],
                }}
              >
                {user.profile_image ? (
                  <img
                    src={`${apiConfig.MEDIA_URL}${user.profile_image}`}
                    alt={user.business_name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    <StoreIcon fontSize="large" />
                  </Avatar>
                )}
              </CardMedia>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {user.business_name || `${user.first_name} ${user.last_name}`}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  {user.roles?.map((role) => (
                    <Chip
                      key={role.id}
                      label={role.name}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <BusinessIcon
                    fontSize="small"
                    sx={{ mr: 1, color: theme.palette.text.secondary }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {user.apmcs?.[0]?.name || "Unknown Market"}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocationOnIcon
                    fontSize="small"
                    sx={{ mr: 1, color: theme.palette.text.secondary }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {user.address?.city}, {user.address?.state}
                  </Typography>
                </Box>
              </CardContent>

              <Box
                sx={{
                  px: 2,
                  pb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2">
                  Shop: {user.address?.shop_number || "N/A"}
                </Typography>
                <Typography variant="body2">
                  {user.phone_number || "No contact"}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Shop;