import React, { useState } from "react";
import { Box, Button, Tooltip, Menu, MenuItem, Badge } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

const NavLinks = ({ navItems }) => {
  const [anchorEls, setAnchorEls] = useState({});

  const handleClick = (event, itemId) => {
    setAnchorEls((prev) => ({ ...prev, [itemId]: event.currentTarget }));
  };

  const handleClose = (itemId) => {
    setAnchorEls((prev) => ({ ...prev, [itemId]: null }));
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
          color: "black",
          "&:hover": {
            backgroundColor: "rgba(43, 74, 4, 0.08)",
            color: "#2b4a04",
          },
          fontSize: { md: "0.85rem", lg: "0.9rem", xl: "0.95rem" },
        },
      }}
    >
      {navItems.map((item) =>
        item.subItems ? (
          <React.Fragment key={`${item.label}-${item.path}`}>
            <Tooltip
              title={item.label}
              key={`tooltip-${item.label}-${item.path}`}
            >
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
                  fontWeight:
                    item.label === "Create Account" ? "bold" : "normal",
                  "&:hover": { color: "#2b4a04 !important" },
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
                    "&:hover": { color: "#2b4a04" },
                  },
                },
              }}
            >
              {item.subItems.map((subItem) => (
                <MenuItem
                  key={`${subItem.label}-${subItem.path}`}
                  onClick={() => {
                    handleClose(item.id);
                    // Add navigation logic here if needed
                  }}
                  sx={{ fontSize: "0.9rem" }}
                >
                  {subItem.label}
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        ) : (
          <Button
            key={`${item.label}-${item.path}`}
            href={item.path}
            disabled={item.disabled}
            sx={{ "&:hover": { color: "#2b4a04 !important" } }}
          >
            {item.label}
          </Button>
        )
      )}
    </Box>
  );
};

export default NavLinks;
