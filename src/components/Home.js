import React, { useState, useEffect } from "react";
//import { COLORS, icons, images, SIZES, FONTS } from "../constants/index.js";
import { categoryData, restaurantData } from "../constants/Home";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  const [category, setCategory] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    setRestaurants(restaurantData);
  }, []);
  return (
    <Container>
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
              <Card.Img variant="top" src={res.photo} rounded />
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
    </Container>
  );
};

export default Home;
