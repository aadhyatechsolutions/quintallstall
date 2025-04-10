import React from "react";
import { Box, IconButton, Badge } from "@mui/material";
import {
  FavoriteBorder,
  ShoppingCart,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useCartStore } from "../../../../../../store/cartStore";
import { useNavigate } from "react-router-dom";
const MobileButton = ({ handleDrawerToggle }) => {
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();
  const handleCartOnClick = () => {
    navigate("/cart");
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton sx={{ color: "black", p: "8px" }}>
        <Badge badgeContent={4} color="error">
          <FavoriteBorder />
        </Badge>
      </IconButton>
      <IconButton onClick={handleCartOnClick} sx={{ color: "black", p: "8px" }}>
        <Badge badgeContent={cartCount} color="error">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ color: "black", p: "8px" }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default MobileButton;
