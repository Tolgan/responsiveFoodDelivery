import React, { useState, useEffect } from "react";
import Map from "./Map";

const OrderDeliver = ({ match, location }) => {
  const { id } = match.params;
  const initialCurrentLocation = {
    streetName: "Kuching",
    gps: {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
    },
  };

  const restaurant = location.state.restaurant;
  const [resLocation, setResLocation] = useState(location.state.location);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation.gps
  );

  return (
    <Map
      id={id}
      currentLocation={currentLocation}
      restaurant={restaurant}
      resLocation={resLocation}
    />
  );
};

export default OrderDeliver;
