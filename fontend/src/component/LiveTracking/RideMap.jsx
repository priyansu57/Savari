import React, { useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  Polyline,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "680px",
  borderRadius: "15px",
};

// Example icons (you can use PNG/SVG links too)
const pickupIcon = "https://img.icons8.com/color/48/car--v1.png"; 
const destinationIcon = "https://img.icons8.com/color/48/marker.png"; 

function RideMap({ pickup, destination }) {
  const [path, setPath] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const mapRef = useRef(null);

  const handleDirectionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        const routePath = response.routes[0].overview_path.map((point) => ({
          lat: point.lat(),
          lng: point.lng(),
        }));
        setPath(routePath);

        // ✅ Auto fit the map to the route
        const bounds = new window.google.maps.LatLngBounds();
        routePath.forEach((p) => bounds.extend(p));
        if (mapRef.current) {
          mapRef.current.fitBounds(bounds);
        }
      } else {
        console.error("Directions request failed due to:", response.status);
      }
    }
  };

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={pickup}
        zoom={6}
        onLoad={onLoad}
        mapTypeId="roadmap"
      >
        {/* Custom Pickup Marker */}
        <Marker
          position={pickup}
          icon={{
            url: pickupIcon,
            scaledSize: new window.google.maps.Size(40, 40), // resize
          }}
        />

        {/* Custom Destination Marker */}
        <Marker
          position={destination}
          icon={{
            url: destinationIcon,
            scaledSize: new window.google.maps.Size(45, 45),
          }}
        />

        {/* Directions Service */}
        {!requestSent && (
          <DirectionsService
            options={{
              origin: pickup,
              destination: destination,
              travelMode: "DRIVING",
            }}
            callback={(res) => {
              setRequestSent(true);
              handleDirectionsCallback(res);
            }}
          />
        )}

        {/* Uber-Style Route */}
        {path.length > 0 && (
          <Polyline
            path={path}
            options={{
              strokeColor: "#000000",
              strokeOpacity: 1,
              strokeWeight: 5,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default RideMap;
