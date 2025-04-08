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
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

const NavActions = ({ isLargeScreen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleHover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/admin/session/signin`;
  };
  const handleRegister = () => {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/admin/session/signup`;
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
        <IconButton sx={{ color: "black", "&:hover": { color: "#2b4a04" } }}>
          <Badge badgeContent={4} color="primary">
            <FavoriteBorder fontSize={isLargeScreen ? "medium" : "small"} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Cart">
        <IconButton sx={{ color: "black", "&:hover": { color: "#2b4a04" } }}>
          <Badge badgeContent={2} color="primary">
            <ShoppingCart fontSize={isLargeScreen ? "medium" : "small"} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Box
        onMouseEnter={handleHover}
        onMouseLeave={handleClose}
        sx={{ position: "relative" }}
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

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            onMouseLeave: handleClose,
            sx: {
              py: 0,
              minWidth: "130px",
            },
          }}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1,
              borderRadius: "4px",
              overflow: "hidden",
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={handleClose}
            sx={{
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <Button
              onClick={handleLogin}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                color: "black",
                fontWeight: "500",
              }}
            >
              Login
            </Button>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <Button
              onClick={handleRegister}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                color: "black",
                fontWeight: "500",
              }}
            >
              Register
            </Button>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default NavActions;
