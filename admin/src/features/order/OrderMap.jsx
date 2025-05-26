import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function OrderMap() {
  const { state } = useLocation();

  const [directions, setDirections] = useState(null);
   const [duration, setDuration] = useState(null);
  const cleanAddress = (address) => address?.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  const origin = cleanAddress(state.origin);
  const destination = cleanAddress(state.destination);

  return (
    <>
      <div style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "16px" }}>
        {duration ? `Estimated Time: ${duration}` : "Calculating route..."}
      </div>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        {!directions && (
          <DirectionsService
            options={{
              destination,
              origin,
              travelMode: "DRIVING",
            }}
            callback={(res) => {
              if (res !== null && res.status === "OK") {
                setDirections(res);
                const leg = res.routes[0]?.legs[0];
                if (leg?.duration) {
                  setDuration(leg.duration.text);
                }
              } else {
                console.error("Directions request failed:", res);
              }
            }}
          />
        )}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </>
  );
}
