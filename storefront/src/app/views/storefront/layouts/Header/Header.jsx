import React from "react";
import Topbar from "./Topbar";
import Navbar from "./Navbar/Navbar";
import { useStickyHeader } from "../../../../../hooks/useStickyHeader";
import "../Header/Header.css";
function Header() {
  const { isSticky } = useStickyHeader(20);
  return (
    <div className={`header-wrapper ${isSticky ? 'sticky' : ''}`}>
      <header>
        <Topbar />
        <Navbar />
      </header>
    </div>
  );
}

export default Header;
