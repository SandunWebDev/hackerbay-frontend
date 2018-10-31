import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "../pages/HomePage/HomePage";
import SignupPage from "../pages/SignupPage/SignupPage";
import LoginPage from "../pages/LoginPage/LoginPage";

import { logoutAccount } from "../../redux/actions/userActions";

import { Navbar, Button } from "@blueprintjs/core";
import "./App.css";

class App extends Component {
  render() {
    const { logoutAccount } = this.props;
    const { loggedIn, name, email } = this.props.user;

    // Condionally rendering right side menu according user is logged in or not.
    let rightSideMenu = "";
    if (loggedIn) {
      rightSideMenu = (
        <div>
          <Link to="/myaccount">
            <Button icon="user" minimal={true}>
              {name.toUpperCase()}
            </Button>
          </Link>
          <Link to="/">
            <Button icon="log-out" minimal={true} onClick={logoutAccount}>
              LogOut
            </Button>
          </Link>
        </div>
      );
    } else {
      rightSideMenu = (
        <div>
          <Link to="/signup">
            <Button icon="badge" minimal={true}>
              Signup
            </Button>
          </Link>

          <Link to="/login">
            <Button icon="log-in" minimal={true}>
              Login
            </Button>
          </Link>
        </div>
      );
    }

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
            {rightSideMenu}
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

const mapStateToProps = state => {
  return { user: state.user };
};

// When react-router used with redux connect() sometime routes don't get updated. To solve this wrap "connect()()" with "withRouter()".
export default withRouter(
  connect(
    mapStateToProps,
    { logoutAccount }
  )(App)
);
