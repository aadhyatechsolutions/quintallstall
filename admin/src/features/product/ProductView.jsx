import {
    Box,
    Grid,
    Typography,
    Button,
    styled,
    Card,
  } from "@mui/material";
  import React, { useEffect } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import useProductStore from "../../store/product/productStore";
  import { SimpleCard } from "app/components";
  import { apiConfig } from "app/config";
  
  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
  }));
  
  export default function ProductView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchProductById, currentProduct } = useProductStore();
  
    useEffect(() => {
        fetchProductById(id);
    }, [id]);
  
    const renderRow = (label, value) => (
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>{label}:</strong> {value || "—"}
          </Typography>
        </Grid>
      );
  
    if (!currentProduct) return <div>Loading...</div>;
  
    return (
      <Container>
        <SimpleCard title="Product Details">
          <Grid container spacing={3}>
            {renderRow("Product Name", currentProduct.name)}
            {renderRow("Category", currentProduct.category?.name)}
            {renderRow("Description", currentProduct.description)}
            {renderRow("Price", currentProduct.price)}
            {renderRow("Quantity", currentProduct.quantity)}
            {renderRow("Unit", currentProduct.unit)}
            {renderRow("Status", currentProduct.status)}
            {renderRow("Vendor Name", `${currentProduct.seller?.first_name || ""} ${currentProduct.seller?.last_name || ""}`)}
            {renderRow("Vendor Role", currentProduct.seller?.roles?.[0]?.name)}
            {renderRow("SKU", currentProduct.sku)}
            {renderRow("Production", currentProduct.production)}
            {renderRow("Quality", currentProduct.quality)}
            {renderRow("UD Field", currentProduct.ud_field)}
            {renderRow("Return Policy", currentProduct.return_policy)}
            {renderRow("Discount Price", currentProduct.discount_price)}
            {renderRow("APMC", currentProduct.apmc?.name)}
  
            {/* Image */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">Image</Typography>
              <img
                src={`${apiConfig.MEDIA_URL}${currentProduct.image}`}
                alt="Product"
                style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
              />
            </Grid>
  
            {/* Feature Image */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">Feature Image</Typography>
              <img
                src={`${apiConfig.MEDIA_URL}${currentProduct.feature_image}`}
                alt="Feature"
                style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
              />
            </Grid>
  
            <Grid item xs={12}>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
        </SimpleCard>
      </Container>
    );
  }
  