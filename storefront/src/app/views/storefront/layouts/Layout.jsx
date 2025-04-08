// src/layouts/Layout.jsx
import React, { Suspense } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom"; // <-- This is key!

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
