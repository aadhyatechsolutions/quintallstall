import {
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  PersonOutline,
  FavoriteBorder,
  ShoppingCart,
  Phone,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCartStore } from "../../../../../../store/cartStore";
import CartPopover from "../../../Cart/CartDialog/CartPopover";
import { useWishlistStore } from "../../../../../../store/wishlistStore";

const NavActions = ({ isLargeScreen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartAnchorRef = useRef(null);
  const open = Boolean(anchorEl);
  const { cart } = useCartStore();
  const { wishlist, loadWishlist } = useWishlistStore();

  // Check login status on component mount and when token might change
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  // Ensure cart is an array, and safely access cart items
  const cartItems = Array.isArray(cart?.items) ? cart.items : [];
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Option 1: Using Zustand store directly
  // const wishlistItems = Array.isArray(wishlist?.items) ? wishlist.items : [];
  // const wishlistCount = wishlistItems.length;
  const wishlistCount = wishlist?.items?.length || 0;

  // console.log(wishlistCount);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
    if (token) {
      loadWishlist(); // Load wishlist when component mounts
    }
  }, [loadWishlist]);

  const handleHover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCartHover = () => setCartDialogOpen(true);
  const handleCartLeave = () => setCartDialogOpen(false);

  const handleLogin = () => {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/admin/session/signin`;
  };

  const handleRegister = () => {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/admin/session/signup`;
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    // You might want to redirect or refresh the page
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { md: 1, lg: 2, xl: 3 },
        ml: "auto",
        pl: { md: 2, lg: 4 },
      }}
    >
      {isLargeScreen && (
        <Tooltip title="Call us">
          <Stack direction="row" alignItems="center" sx={{ cursor: "pointer" }}>
            <Phone sx={{ fontSize: "1.3rem", mr: 1 }} />
            <Typography variant="body1" sx={{ fontSize: "1rem" }}>
              +9 888 104 2340
            </Typography>
          </Stack>
        </Tooltip>
      )}

      <Tooltip title="Wishlist">
        <IconButton
          sx={{ color: "black", "&:hover": { color: "#2b4a04" } }}
          onClick={() => navigate("/wishlist")}
        >
          <Badge badgeContent={wishlistCount} color="error">
            <FavoriteBorder fontSize={isLargeScreen ? "medium" : "small"} />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Cart Icon + Hover Logic */}
      <Box
        onMouseEnter={handleCartHover}
        onMouseLeave={handleCartLeave}
        style={{ display: "inline-block", position: "relative" }}
      >
        <Tooltip>
          <IconButton
            ref={cartAnchorRef}
            sx={{ color: "black", "&:hover": { color: "#2b4a04" } }}
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCart fontSize={isLargeScreen ? "medium" : "small"} />
            </Badge>
          </IconButton>
        </Tooltip>

        <CartPopover
          open={cartDialogOpen}
          onClose={() => setCartDialogOpen(false)}
          onMouseEnter={handleCartHover}
          onMouseLeave={handleCartLeave}
          anchorEl={cartAnchorRef.current}
        />
      </Box>

      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          "&:hover .account-dropdown": {
            display: "block",
          },
        }}
      >
        <Button
          startIcon={
            <PersonOutline fontSize={isLargeScreen ? "medium" : "small"} />
          }
          sx={{
            color: "black",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: { md: "0.9rem", lg: "1rem" },
            "&:hover": { color: "#2b4a04" },
          }}
        >
          My Account
        </Button>

        {/* Dropdown */}
        <Box
          className="account-dropdown"
          sx={{
            display: "none",
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "white",
            minWidth: "130px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "4px",
            zIndex: 10,
          }}
        >
          {isLoggedIn ? (
            <MenuItem
              onClick={handleLogout}
              sx={{
                "&:hover": { backgroundColor: "#f5f5f5" },
                fontSize: { md: "0.9rem", lg: "1rem" },
                fontWeight: "500",
                color: "black",
              }}
            >
              <Logout fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          ) : (
            <>
              <MenuItem
                onClick={handleLogin}
                sx={{
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                  fontSize: { md: "0.9rem", lg: "1rem" },
                  fontWeight: "500",
                  color: "black",
                }}
              >
                Login
              </MenuItem>
              <MenuItem
                onClick={handleRegister}
                sx={{
                  "&:hover": { backgroundColor: "#f5f5f5" },
                  fontSize: { md: "0.9rem", lg: "1rem" },
                  fontWeight: "500",
                  color: "black",
                }}
              >
                Register
              </MenuItem>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NavActions;
