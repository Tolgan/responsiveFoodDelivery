import React from "react";
//import { icons } from "../constants";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = ({ currentLocation, restaurants, resLocation, id }) => {
  const center = resLocation
    ? [
        (currentLocation.latitude + resLocation.latitude) / 2,
        (currentLocation.longitude + resLocation.longitude) / 2,
      ]
    : [currentLocation.latitude, currentLocation.longitude];
  const position1 = [currentLocation.latitude, currentLocation.longitude];
  const position2 = restaurants
    ? restaurants.map((res) => [res.location.latitude, res.location.longitude])
    : [[resLocation.latitude, resLocation.longitude]];

  console.log(position2);

  let zoom = 15;

  return (
    <div style={{ position: "relative", height: "80vh", width: "80vw" }}>
      {!restaurants && (
        <Link
          to={`/${id}`}
          style={{ position: "absolute", zIndex: 9999, bottom: 50, left: 0 }}
        >
          <i className="fas fa-arrow-left"></i>{" "}
        </Link>
      )}
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={
          restaurants
            ? { height: "100%", width: "100%", zIndex: 1, opacity: 1 }
            : { height: "100%", width: "100%", zIndex: 1, margin: "0 auto" }
        }
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position1}>
          {" "}
          <Tooltip sticky>My Location</Tooltip>
        </Marker>
        {position2.map((pos, index) => (
          <Marker key={index} position={pos}>
            <Tooltip sticky>Restaurant</Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

Map.defaultProps = {
  center: [59.95, 30.33],
  zoom: 11,
};

export default Map;
