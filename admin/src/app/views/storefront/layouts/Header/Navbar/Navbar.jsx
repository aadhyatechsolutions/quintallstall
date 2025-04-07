import { useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";
import MobileMenu from "./MobileMenu";
import MobileButton from "./MobileButton";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isLargeScreen = useMediaQuery("(min-width:1440px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const open = Boolean(anchorEl);

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "About", path: "/about" },
    { label: "Shop", path: "/shop" },
    { label: "Products", path: "/products" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];
  const logo = "../assets/images/logos/logo-quintal.png";
  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "white",
          color: "black",
          boxShadow: "none",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          padding: "10px",
        }}
      >
        <Container maxWidth={isLargeScreen ? "xl" : "lg"}>
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <NavLogo logo={logo} />

            {!isMobile ? (
              <>
                <NavLinks
                  navItems={navItems}
                  anchorEl={anchorEl}
                  open={open}
                  handleClick={(e) => setAnchorEl(e.currentTarget)}
                  handleClose={() => setAnchorEl(null)}
                />
                <NavActions isLargeScreen={isLargeScreen} />
              </>
            ) : (
              <MobileButton
                handleDrawerToggle={() => setMobileOpen(!mobileOpen)}
              />
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <MobileMenu
        mobileOpen={mobileOpen}
        handleDrawerToggle={() => setMobileOpen(!mobileOpen)}
        navItems={navItems}
        anchorEl={anchorEl}
        open={open}
        handleClick={(e) => setAnchorEl(e.currentTarget)}
        handleClose={() => setAnchorEl(null)}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
      />
    </>
  );
};

export default Navbar;
