import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import OrderDeliver from "./components/OrderDeliver";
import Restaurant from "./components/Restaurant";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route component={Restaurant} exact path="/:id" />
        <Route component={OrderDeliver} exact path="/:id/order" />
      </Router>
    );
  }
}

export default App;
