import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const Map = () => {
  const [map, setMap] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = React.useRef();

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={{ lat: -34.397, lng: 150.644 }}
      zoom={8}
      onLoad={onLoad}
      ref={mapRef}
    >
      {/* Add your map markers, polygons, etc. here */}
    </GoogleMap>
  );
};

export default Map;
