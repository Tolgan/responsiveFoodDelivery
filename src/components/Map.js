import React, { useState } from "react";
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
  const [kilometre, setKilometre] = useState(null);

  const rangeHandler = (e) => {
    setKilometre(Number(e.target.value).toFixed(2));
  };
  const center = resLocation
    ? [
        (currentLocation.latitude + resLocation.latitude) / 2,
        (currentLocation.longitude + resLocation.longitude) / 2,
      ]
    : [currentLocation.latitude, currentLocation.longitude];
  const position1 = [currentLocation.latitude, currentLocation.longitude];
  const position2 = restaurants
    ? restaurants.map((res) => ({
        position: [res.location.latitude, res.location.longitude],
        id: res.id,
        name: res.name,
      }))
    : { position: [resLocation.latitude, resLocation.longitude] };

  let zoom = 14;
  position2.forEach(
    (pos) =>
      (pos.distance = Number(
        getDistanceFromLatLonInKm(pos.position[0], pos.position[1])
      ))
  );

  const filteredPositions = position2.filter(
    (pos) => pos.distance <= kilometre
  );
  console.log(filteredPositions);
  //https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula#:~:text=from%20math%20import%20cos%2C%20asin,*R*asin...
  function getDistanceFromLatLonInKm(
    lat1,
    lon1,
    lat2 = currentLocation.latitude,
    lon2 = currentLocation.longitude
  ) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d.toFixed(2);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

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
        {kilometre
          ? filteredPositions.map((pos) => (
              <Marker key={pos.id} position={pos.position}>
                <Tooltip sticky>
                  {pos.name} {pos.distance}km away
                </Tooltip>
              </Marker>
            ))
          : position2.map((pos) => (
              <Marker key={pos.id} position={pos.position}>
                <Tooltip sticky>
                  {pos.name} {pos.distance}km away
                </Tooltip>
              </Marker>
            ))}
      </MapContainer>
      {restaurants && (
        <div
          style={{
            width: "30vw",
            position: "absolute",
            bottom: "0",
            left: "30%",
            zIndex: "99999",
            margin: "0 auto",
          }}
        >
          <input
            onChange={(e) => rangeHandler(e)}
            type="range"
            min="0"
            max="4"
            step="0.1"
            id="kilometre"
            style={{ width: "40%", height: 3, borderRadius: 1 }}
          />
          <label style={{ color: "turquoise" }} htmlFor="kilometre">
            Kilometre
          </label>
          <span style={{ color: "darkblue" }}>
            {kilometre && ":" + kilometre + "km"}
          </span>
        </div>
      )}
      {restaurants && kilometre && (
        <p style={{ color: "turquoise" }}>
          {filteredPositions.length} Restaurants Match Your Criteria
        </p>
      )}
    </div>
  );
};

Map.defaultProps = {
  center: [59.95, 30.33],
  zoom: 11,
};

export default Map;
