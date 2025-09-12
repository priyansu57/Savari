import React, { useState, useEffect, useCallback } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";



function LiveTracking({height}) {
  const containerStyle = {
  width: "100%",
  height: height || "74vh",
  borderRadius: "15px",
  overflow: "hidden",  
};

const center = {
  lat: 37.7749, // Default latitude (San Francisco)
  lng: -122.4194, // Default longitude (San Francisco)
};

 const [userLocation, setUserLocation] = useState(center); // User's current location
  const [map, setMap] = useState(null);

  // Function to update the user's location
  const updateUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log("User location retrieved:", position);
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);
          console.log("User location updated:", newLocation);
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Update the user's location every 10 seconds
  useEffect(() => {
    const locationInterval = setInterval(updateUserLocation, 10000); // Update location every 10 seconds
    updateUserLocation(); // Initial call to set location immediately

    return () => clearInterval(locationInterval); // Clean up interval on unmount
  }, [updateUserLocation]);

  // Handle map load
  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  // Handle map unmount
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={16}
          onLoad={onLoad}
          mapTypeId="hybrid"
          onUnmount={onUnmount}
        >
          {/* Marker for the user's current location */}
          <Marker position={userLocation} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default LiveTracking;

