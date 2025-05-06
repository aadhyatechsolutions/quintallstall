import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ShopByCategories from "../../ShopByCategories/ShopByCategories";
import APMCMarketGrid from "../../APMC/APMCMarketCard";
import ProductsSlider from "../../Products/ProductsSlider";
import Features from "../../Features/Features";
import FeatureBanner from "../../Features/FeatureBanner";
import PromoBanner from "../../Banner/PromoBanner";
import Carousel from "../../Carousel/Carousel";
import TopProductsSlider from "../../Products/TopProductsSlider";
import OfferCards from "../../PromoCard/OfferCards";
import SpecialOfferSlider from "../../Products/SpecialOfferSlider";
function Body() {
  return (
    <>
      <Carousel />
      <ShopByCategories />
      <APMCMarketGrid />
      <ProductsSlider />
      <PromoBanner />
      <TopProductsSlider/>
      <Box mt={0.5}>
        <OfferCards />
      </Box>
      <SpecialOfferSlider />
      
      <Features />
      {/* <FeatureBanner /> */}
    </>
  );
}

export default Body;
