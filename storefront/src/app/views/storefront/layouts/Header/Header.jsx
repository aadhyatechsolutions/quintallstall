import React from "react";
import Topbar from "./Topbar";
import Navbar from "./Navbar/Navbar";
import Carousel from "../../Carousel/Carousel";

function Header() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Carousel />
    </>
  );
}

export default Header;
