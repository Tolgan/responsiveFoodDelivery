import React from "react";
import GoogleMapReact from "google-map-react";
import { icons, COLORS, FONTS } from "../constants";
import { Link } from "react-router-dom";

const Marker = ({ text }) => {
  return (
    <img
      src={text}
      alt="marker"
      style={{
        height: 50,
        width: 50,
      }}
    />
  );
};

const Map = ({ currentLocation, restaurant, resLocation, id }) => {
  const center = {
    lat: (currentLocation.latitude + resLocation.latitude) / 2,
    lng: (currentLocation.longitude + resLocation.longitude) / 2,
  };
  let zoom = 15;
  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <Link to={`/${id}`} style={{ position: "absolute", top: 0, left: 0 }}>
        <i className="fas fa-arrow-left"></i>{" "}
      </Link>

      <GoogleMapReact
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <Marker
          lat={currentLocation.latitude}
          lng={currentLocation.longitude}
          text={icons.car}
        />
        <Marker
          lat={resLocation.latitude}
          lng={resLocation.longitude}
          text={icons.red_pin}
        />
      </GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  center: { lat: 59.95, lng: 30.33 },
  zoom: 11,
};

export default Map;
