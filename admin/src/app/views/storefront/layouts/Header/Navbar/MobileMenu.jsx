import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

const MobileMenu = ({ mobileOpen, handleDrawerToggle, navItems }) => {
  // State to control the dropdowns
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null); // Track which menu is open

  const handleClick = (event, index) => {
    if (openMenu === index) {
      setOpenMenu(null); // Close menu if it's already open
    } else {
      setOpenMenu(index); // Open the clicked menu
      setAnchorEl(event.currentTarget); // Set anchor for the dropdown
    }
  };

  const handleClose = () => {
    setOpenMenu(null); // Close the menu
  };

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          top: { xs: 56, sm: 64 },
        },
      }}
    >
      <List sx={{ padding: 0 }}>
        {navItems.map((item, index) => (
          <React.Fragment key={item.label}>
            {item.subItems ? (
              <>
                <ListItem button onClick={(e) => handleClick(e, index)}>
                  <ListItemText primary={item.label} />
                  <ArrowDropDown />
                </ListItem>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu === index} // Only open the menu for the clicked item
                  onClose={handleClose}
                >
                  {item.subItems.map((subItem) => (
                    <MenuItem key={subItem.label} onClick={handleClose}>
                      {subItem.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <ListItem button onClick={handleClick}>
                <ListItemText primary={item.label} />
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
