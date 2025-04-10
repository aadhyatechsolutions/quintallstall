import React from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  Grid,
  Button,
  Divider,
  Chip,
  Rating,
  Stack,
  IconButton,
  useTheme,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import {
  ShoppingCart,
  FavoriteBorder,
  Share,
  LocalShipping,
  Verified,
  ArrowForward,
  ExpandMore,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useProduct } from "../../../../hooks/useProducts";
import { useCartStore } from "../../../../store/cartStore";

const ProductDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const addToCart = useCartStore((state) => state.addToCart);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, alignItems: "center" }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}></Breadcrumbs>

      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={4}>
          {/* Left Column - Product Images */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                border: "1px solid #f0f0f0",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
              }}
            >
              <CardMedia
                component="img"
                image={product?.image || "/placeholder.jpg"}
                alt={product?.name}
                sx={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 400,
                  objectFit: "contain",
                }}
              />
            </Box>
            <Stack direction="row" spacing={1} mt={2} justifyContent="center">
              {[1, 2, 3, 4].map((item) => (
                <Box
                  key={item}
                  sx={{
                    width: 60,
                    height: 60,
                    border: "1px solid #f0f0f0",
                    borderRadius: 1,
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <img
                    src={product?.image || "/placeholder.jpg"}
                    alt={`Thumbnail ${item}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Middle Column - Product Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {product?.name}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Rating
                value={product?.rating || 4.2}
                precision={0.1}
                readOnly
                size="small"
              />
              <Typography color="text.secondary" variant="body2">
                {product?.reviews || 1245} Ratings & Reviews
              </Typography>
              <Chip
                label="Verified"
                size="small"
                icon={<Verified fontSize="small" />}
                sx={{ backgroundColor: "#e3f2fd" }}
              />
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h4" fontWeight={700} mb={2}>
              ₹{product?.price}
              {product?.originalPrice && (
                <Typography
                  component="span"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.disabled",
                    ml: 1,
                    fontSize: "1rem",
                  }}
                >
                  ₹{product?.originalPrice}
                </Typography>
              )}
              {product?.discount && (
                <Typography
                  component="span"
                  color="success.main"
                  sx={{ ml: 1, fontSize: "1rem" }}
                >
                  {product?.discount}% off
                </Typography>
              )}
            </Typography>

            <Typography color="success.main" fontWeight={500} mb={2}>
              Special price
            </Typography>

            <Box mb={3}>
              <Typography variant="subtitle2" gutterBottom>
                Offers
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <Typography variant="body2">
                    <strong>Bank Offer</strong> 10% off on SBI Credit Cards
                  </Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Typography variant="body2">
                    <strong>Partner Offer</strong> Sign up for Pay Later and get
                    Gift Card worth ₹100
                  </Typography>
                </ListItem>
              </List>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mb={3}>
              <Typography variant="subtitle2" gutterBottom>
                Available offers
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <Typography variant="body2">
                    <strong>Special Price</strong> Get extra 5% off (price
                    inclusive of discount)
                  </Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Typography variant="body2">
                    <strong>Partner Offer</strong> Purchase now & get a surprise
                    cashback coupon
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Grid>

          {/* Right Column - Delivery & Actions */}
          <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{ p: 2, border: "1px solid #f0f0f0" }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Delivery Options
              </Typography>

              <Box display="flex" alignItems="center" mb={2}>
                <LocalShipping color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography>
                    Delivery to <strong>Delhi 110001</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Usually delivered in 3-4 days
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Seller Information
              </Typography>
              <Typography variant="body2" gutterBottom>
                Sold by: <strong>SuperComNet</strong> (4.5/5 rating)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                7 Days Replacement Policy
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Button
                fullWidth
                variant="contained"
                color="warning"
                size="large"
                startIcon={<ShoppingCart />}
                sx={{ mb: 2, py: 1.5, fontWeight: 600 }}
              >
                ADD TO CART
              </Button>

              <Button
                fullWidth
                variant="contained"
                color="success"
                size="large"
                sx={{ py: 1.5, fontWeight: 600 }}
              >
                BUY NOW
              </Button>

              <Stack direction="row" spacing={1} mt={2}>
                <IconButton>
                  <FavoriteBorder />
                </IconButton>
                <IconButton>
                  <Share />
                </IconButton>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Product Details Tabs */}
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 3,
          }}
        >
          <Tab label="Product Details" />
          <Tab label="Specifications" />
          <Tab label="Reviews" />
        </Tabs>

        {value === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              About this item
            </Typography>
            <Typography variant="body1" paragraph>
              {product?.description ||
                "No description available for this product."}
            </Typography>
          </Box>
        )}

        {value === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Specifications
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Brand"
                  secondary={product?.brand || "Not specified"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Model"
                  secondary={product?.model || "Not specified"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Color"
                  secondary={product?.color || "Not specified"}
                />
              </ListItem>
            </List>
          </Box>
        )}

        {value === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Customer Reviews
            </Typography>
            <Typography color="text.secondary">
              No reviews yet. Be the first to review!
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Similar Products */}
      <Paper elevation={0} sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6">Similar Products</Typography>
          <Button endIcon={<ArrowForward />}>View All</Button>
        </Box>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item}>
              <Card elevation={0} sx={{ p: 2, cursor: "pointer" }}>
                <CardMedia
                  component="img"
                  image="/placeholder.jpg"
                  alt="Similar product"
                  sx={{ height: 140, objectFit: "contain" }}
                />
                <Typography variant="subtitle2" noWrap>
                  Similar Product {item}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category
                </Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                  ₹{Math.round(Math.random() * 10000)}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
