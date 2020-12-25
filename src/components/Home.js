import React, { useState, useEffect } from "react";
//import { COLORS, icons, images, SIZES, FONTS } from "../constants/index.js";
import { restaurantData } from "../constants/Home";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import "./Home.css";
import { Link } from "react-router-dom";
import Map from "./Map";
const Home = () => {
  // const [category, setCategory] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [map, setMap] = useState(false);
  useEffect(() => {
    setRestaurants(restaurantData);
  }, []);

  const initialCurrentLocation = {
    streetName: "Kuching",
    gps: {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
    },
  };
  const toggleChanger = () => {
    setMap(!map);
  };
  return (
    <Container>
      <div className="myrow ">
        <h4>Switch to Map view</h4>
        <div id="topmenu" onClick={toggleChanger}>
          <span className={!map ? "openmap activespan" : "openmap"}>Off</span>
          <span className={map ? "openmap activespan" : "openmap"}>On</span>
        </div>
      </div>
      <Row className="mt-4">
        {restaurants.map((res) => (
          <Col
            key={res.id}
            md={4}
            sm={12}
            lg={3}
            style={{ marginBottom: "20px" }}
            className="customCard"
          >
            <Card style={{ width: "100%", height: "100%" }}>
              <Card.Img variant="top" src={res.photo} />
              <span id="homeSpan">{res.duration}</span>
              <Card.Body className="customBody">
                <Card.Title>{res.name}</Card.Title>
                <Card.Text as="p" id="cardText">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Link to={`/${res.id}`}>
                  <Button variant="primary">Go somewhere</Button>
                </Link>
              </Card.Body>
              <Card.Footer className="customfooter">
                <small className="text-muted">{res.rating}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      {map && (
        <div className="openedmap">
          <Map
            currentLocation={initialCurrentLocation.gps}
            restaurants={restaurants}
          />
          <span
            onClick={() => setMap(false)}
            style={{
              right: 15,
              top: 0,
              zIndex: "10999",
              color: "darkblue",
              fontSize: 40,
              cursor: "pointer",
              position: "absolute",
            }}
          >
            X
          </span>
        </div>
      )}
    </Container>
  );
};

export default Home;
