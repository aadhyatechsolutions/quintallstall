import React from "react";
import { Box, IconButton, Badge } from "@mui/material";
import { FavoriteBorder, ShoppingCart, Menu as MenuIcon } from "@mui/icons-material";

const MobileButton = ({ handleDrawerToggle }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton sx={{ color: "black", p: '8px' }}>
        <Badge badgeContent={4} color="primary">
          <FavoriteBorder />
        </Badge>
      </IconButton>
      <IconButton sx={{ color: "black", p: '8px' }}>
        <Badge badgeContent={2} color="primary">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ color: "black", p: '8px' }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default MobileButton;