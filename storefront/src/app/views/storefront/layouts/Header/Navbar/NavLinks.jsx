import React, { useState } from "react";
import { Box, Button, Tooltip, Menu, MenuItem, Badge } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NavLinks = ({ navItems }) => {
  const [anchorEls, setAnchorEls] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event, itemId) => {
    setAnchorEls((prev) => ({ ...prev, [itemId]: event.currentTarget }));
  };

  const handleClose = (itemId) => {
    setAnchorEls((prev) => ({ ...prev, [itemId]: null }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mx: "auto",
        "& .MuiButton-root": {
          margin: 0,
          padding: { md: "4px 6px", lg: "6px 8px" },
          minWidth: "auto",
          borderRadius: 0,
          fontSize: { md: "0.85rem", lg: "0.9rem", xl: "0.95rem" },
        },
      }}
    >
      {navItems.map((item) =>
        item.subItems ? (
          <React.Fragment key={`${item.label}-${item.path}`}>
            <Tooltip title={item.label}>
              <Button
                id={`${item.label}-${item.path}-button`}
                aria-controls={
                  anchorEls[item.id]
                    ? `${item.label}-${item.path}-menu`
                    : undefined
                }
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEls[item.id]) ? "true" : undefined}
                onClick={(e) => handleClick(e, item.id)}
                endIcon={
                  <ArrowDropDown sx={{ fontSize: "1rem", color: "black" }} />
                }
                sx={{
                  color: isActive(item.path) ? "#b6131a" : "black",
                  fontWeight: isActive(item.path) ? "bold" : "normal",
                  "&:hover": {
                    color: "#b6131a",
                    backgroundColor: "rgba(182, 19, 26, 0.05)",
                  },
                }}
              >
                {item.label}
                {item.badge && (
                  <Badge badgeContent={item.badge} color="primary" />
                )}
              </Button>
            </Tooltip>
            <Menu
              id={`${item.label}-${item.path}-menu`}
              anchorEl={anchorEls[item.id]}
              open={Boolean(anchorEls[item.id])}
              onClose={() => handleClose(item.id)}
              MenuListProps={{
                sx: {
                  minWidth: 160,
                  "& .MuiMenuItem-root": {
                    color: "black",
                    fontSize: "0.9rem",
                    "&:hover": { color: "#b6131a" },
                  },
                },
              }}
            >
              {item.subItems.map((subItem) => (
                <MenuItem
                  key={`${subItem.label}-${subItem.path}`}
                  onClick={() => {
                    handleClose(item.id);
                    navigate(subItem.path);
                  }}
                  sx={{
                    color: isActive(subItem.path) ? "#b6131a" : "black",
                    fontWeight: isActive(subItem.path) ? "bold" : "normal",
                  }}
                >
                  {subItem.label}
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        ) : (
          <Button
            key={`${item.label}-${item.path}`}
            component={Link}
            to={item.path}
            disabled={item.disabled}
            sx={{
              color: isActive(item.path) ? "#b6131a" : "black",
              fontWeight: isActive(item.path) ? "normal" : "normal",
              "&:hover": {
                color: "#b6131a",
                backgroundColor: "rgba(182, 19, 26, 0.05)",
              },
            }}
          >
            {item.label}
          </Button>
        )
      )}
    </Box>
  );
};

export default NavLinks;
