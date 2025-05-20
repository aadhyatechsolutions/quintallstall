import React, { Suspense } from 'react';
import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { MatxTheme } from "./components";
import SettingsProvider from "./contexts/SettingsContext";
import { AuthProvider } from "../context/AuthContext";
import routes from "./routes";
import { LoadScript } from "@react-google-maps/api";
// FAKE SERVER
import "../__api__";



export default function App() {
  const content = useRoutes(routes);

  return (
    <LoadScript googleMapsApiKey="AIzaSyC314oUSxmRLd89q0sBIm99rkZiice-wEA">
    <SettingsProvider>
      <AuthProvider>
        <MatxTheme>
          <CssBaseline />
          <Suspense fallback={<div>Loading...</div>}>
            {content}
          </Suspense>
        </MatxTheme>
      </AuthProvider>
    </SettingsProvider>
    </LoadScript>
  );
}
