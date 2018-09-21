import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import SignupPage from "../pages/SignupPage/SignupPage";
import LoginPage from "../pages/LoginPage/LoginPage";

import { Navbar, Button } from "@blueprintjs/core";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar className="App__Navbar bp3-dark" fixedToTop={true}>
          <Navbar.Group align={"left"}>
            <Navbar.Heading className="App__Navbar__heading">
              <Link to="/">
                <Button icon="search-around" minimal={true}>
                  HACKERBAY
                </Button>
              </Link>
            </Navbar.Heading>
            <Navbar.Divider />
            <Navbar.Group className="App__Navbar__leftmenu">
              <Button icon="projects" text="Products" minimal={true} />
              <Button icon="dollar" text="Pricing" minimal={true} />
              <Button icon="dashboard" text="Dashboard" minimal={true} />
              <Button icon="compass" text="About Us" minimal={true} />
            </Navbar.Group>
          </Navbar.Group>
          <Navbar.Group className="App__Navbar__rightmenu" align={"right"}>
            <Link to="/signup">
              <Button icon="user" minimal={true}>
                Signup
              </Button>
            </Link>

            <Link to="/login">
              <Button icon="log-in" minimal={true}>
                Login
              </Button>
            </Link>
          </Navbar.Group>
        </Navbar>
        <div className="App__container">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/login" component={LoginPage} />
        </div>
      </div>
    );
  }
}
