import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const MobileMenu = ({ mobileOpen, handleDrawerToggle, navItems }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event, index) => {
    if (openMenu === index) {
      setOpenMenu(null);
      setAnchorEl(null);
    } else {
      setOpenMenu(index);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setOpenMenu(null);
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
    handleDrawerToggle();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={() => {
        handleDrawerToggle();
        handleClose();
      }}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          top: { xs: 46, sm: 56 },
          bgcolor: "#fff",
          boxShadow: 3,
        },
      }}
    >
      <List sx={{ padding: 0 }}>
        {navItems.map((item, index) => (
          <React.Fragment key={item.label}>
            {item.subItems ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={(e) => handleClick(e, index)}
                    sx={{
                      color: openMenu === index ? "#b6131a" : "inherit",
                      fontWeight: openMenu === index ? "bold" : "normal",
                      "&:hover": {
                        color: "#b6131a",
                        backgroundColor: "#f9f9f9",
                      },
                    }}
                  >
                    <ListItemText primary={item.label} />
                    <ArrowDropDown />
                  </ListItemButton>
                </ListItem>

                <Menu
                  anchorEl={anchorEl}
                  open={openMenu === index}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  MenuListProps={{
                    sx: {
                      padding: 0,
                      "& .MuiMenuItem-root": {
                        fontSize: "0.95rem",
                        padding: "8px 16px",
                      },
                    },
                  }}
                >
                  {item.subItems.map((subItem) => (
                    <MenuItem
                      key={subItem.label}
                      onClick={() => handleNavigate(subItem.path)}
                      sx={{
                        color: isActive(subItem.path) ? "#b6131a" : "inherit",
                        fontWeight: isActive(subItem.path) ? "bold" : "normal",
                        "&:hover": {
                          color: "#b6131a",
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      {subItem.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    color: isActive(item.path) ? "#b6131a" : "inherit",
                    fontWeight: isActive(item.path) ? "normal" : "normal",
                    "&:hover": {
                      color: "#b6131a",
                      backgroundColor: "#f9f9f9",
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            )}
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default MobileMenu;
