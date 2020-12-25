import React, { useState, useEffect } from "react";
import { Carousel, Spinner, Button, Image } from "react-bootstrap";
import { restaurantData } from "../constants/Home";
import "./Restaurant.css";
import { Link } from "react-router-dom";
import { COLORS, icons } from "../constants/index.js";

const Restaurant = ({ match, location }) => {
  const { id } = match.params;
  const [restaurant, setRestaurant] = useState([]);
  const [cart, setCart] = useState([]);
  const filter = () => {
    const resta = restaurantData.filter(
      (item) => item.id.toString() === id.toString()
    );

    setRestaurant(resta[0]);
  };
  useEffect(() => {
    filter();
  }, []);

  const cartHandler = (operator, menuId, price) => {
    let newcart = cart.slice();
    let mymenu = newcart.filter(
      (item) => item.menuId.toString() === menuId.toString()
    );
    if (!mymenu.length > 0) {
      if (operator == "+") {
        let newitem = { qty: 1, price, total: price, menuId };
        newcart.push(newitem);
      }
    } else {
      if (operator == "+" && mymenu[0]) {
        let newQty = mymenu[0].qty + 1;
        mymenu[0].qty = newQty;
        mymenu[0].total = price * mymenu[0].qty;
      } else {
        if (mymenu[0] && mymenu[0].qty > 0) {
          let newQty = mymenu[0].qty - 1;
          mymenu[0].qty = newQty;
          mymenu[0].total = price * mymenu[0].qty;
        }
      }
    }
    setCart(newcart);
  };

  function getQty(menuId) {
    let array = cart.filter((item) => item.menuId == menuId);
    console.log(array);

    return array.length > 0 ? array[0].qty : 0;
  }

  function sumQty() {
    let c = cart.reduce((a, b) => {
      return a + b.qty;
    }, 0);

    return c > 0 ? c : "No";
  }
  function sumPrice() {
    let a;
    a = cart.reduce((a, b) => {
      return a + b.total;
    }, 0);

    return a > 0 ? "$" + a.toFixed(2) : "";
  }

  return (
    <>
      <Link to={"/"}>
        <i className="fas fa-arrow-left"></i>{" "}
      </Link>
      {restaurant.menu ? (
        <div id="resDiv">
          <Carousel className="customCarousel">
            {restaurant.menu.map((item) => (
              <Carousel.Item key={item.menuId}>
                <div className="container">
                  <img
                    className="d-block myimage"
                    src={item.photo}
                    alt={item.name}
                  />
                  <div id="cartArranger">
                    <Button
                      style={{
                        width: 50,
                        borderColor: COLORS.white,
                        backgroundColor: COLORS.white,
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderTopLeftRadius: 25,
                        borderBottomLeftRadius: 25,
                      }}
                      onClick={() => {
                        cartHandler("-", item.menuId, item.price);
                      }}
                    >
                      -
                    </Button>
                    <h2>{getQty(item.menuId)}</h2>
                    <Button
                      style={{
                        width: 50,
                        borderColor: COLORS.white,
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopRightRadius: 25,
                        borderBottomRightRadius: 25,
                      }}
                      onClick={() => {
                        cartHandler("+", item.menuId, item.price);
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div id="mycaption">
                  <h2>
                    {item.name}-
                    <span id="myspan">${item.price.toFixed(2)}</span>
                  </h2>
                  <p>{item.description}</p>
                  <div
                    style={{
                      dispay: "flex",
                      flexDirection: "row",
                      marginTop: 10,
                    }}
                  >
                    <Image
                      src={icons.fire}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 10,
                      }}
                    />
                    <small>{item.calories}calories</small>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="orderSection">
            <div className="cartItems">
              <h2>{sumQty()} Items in Cart</h2>
              <h2>{sumPrice()}</h2>
            </div>
            <div className="locationItems">
              <div className="location">
                <Image className="icon" src={icons.pin} alt={"pin_icon"} />
                <h2>Trabzon</h2>
              </div>
              <div className="cartInfo">
                <Image
                  className="icon"
                  src={icons.master_card}
                  alt={"mastercardIcon"}
                />
                <h2>***61</h2>
              </div>
            </div>
            <Link
              to={{
                pathname: `${location.pathname}/order`,
                state: { location: restaurant.location, restaurant },
              }}
            >
              <div id="orderContainer">
                <Button disabled={sumQty() === "No"}>Order</Button>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </>
  );
};

export default Restaurant;
