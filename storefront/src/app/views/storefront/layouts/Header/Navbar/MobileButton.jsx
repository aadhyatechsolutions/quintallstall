import React, { useEffect, useState } from "react";
import { Box, IconButton, Badge } from "@mui/material";
import {
  FavoriteBorder,
  ShoppingCart,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useCartStore } from "../../../../../../store/cartStore";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../../../../../store/wishlistStore";

const MobileButton = ({ handleDrawerToggle }) => {
  const cart = useCartStore((state) => state.cart);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { wishlist, loadWishlist } = useWishlistStore();

  // Ensure cart is an array, and safely access cart items
  const cartItems = Array.isArray(cart?.items) ? cart.items : [];
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const handleCartOnClick = () => {
    navigate("/cart");
  };

  // wishlist
  const wishlistCount = wishlist?.items?.length || 0;
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
    if (token) {
      loadWishlist();
    }
  }, [loadWishlist]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton sx={{ color: "black", p: "8px" }}
       onClick={() => navigate("/wishlist")}
      >
        <Badge badgeContent={wishlistCount} color="error">
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
