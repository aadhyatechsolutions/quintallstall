import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import routes from "./routes";
import { LoadScript } from "@react-google-maps/api";

const googleMapsApiKey = "AIzaSyC314oUSxmRLd89q0sBIm99rkZiice-wEA"; // Replace with your actual key

function App() {
  const content = useRoutes(routes);

  return (
    <>
      <CssBaseline />
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <Suspense
          fallback={<div style={{ padding: "2rem" }}>Loading page...</div>}
        >
          {content}
        </Suspense>
      </LoadScript>
    </>
  );
}

export default App;
