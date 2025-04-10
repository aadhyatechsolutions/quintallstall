// src/layouts/Layout.jsx
import React, { Suspense } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom"; // <-- This is key!
import { Box, CircularProgress } from "@mui/material";

function Layout() {
  return (
    <>
      <Header />

      <main>
        <Suspense
          fallback={
            <Box>
              <CircularProgress />
            </Box>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
