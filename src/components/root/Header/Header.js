import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navbar, Button } from "@blueprintjs/core";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAccount } from "../../../redux/actions/userActions";

import "./Header.css";

export class Header extends Component {
  render() {
    const { loggedIn, name, logoutAccount } = this.props;

    // Condionally rendering right side menu according user is logged in or not.
    let rightSideMenu = "";
    if (loggedIn) {
      rightSideMenu = (
        <div>
          <Link to="/dashboard">
            <Button icon="dashboard" text="Dashboard" minimal={true} />
          </Link>
          <Link to="/myaccount">
            <Button icon="user" minimal={true} data-testid="myAccountButton">
              {name.toUpperCase()}
            </Button>
          </Link>
          <Link to="/">
            <Button
              icon="log-out"
              minimal={true}
              onClick={logoutAccount}
              data-testid="logoutButton"
            >
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
      <div className="Header">
        <Navbar className="Header__Navbar bp3-dark" fixedToTop={true}>
          <Navbar.Group align={"left"}>
            <Navbar.Heading className="Header__Navbar__heading">
              <Link to="/" data-testid="hackerbayMainLogoLink">
                <Button icon="search-around" minimal={true}>
                  HACKERBAY
                </Button>
              </Link>
            </Navbar.Heading>
            <Navbar.Divider />
            <Navbar.Group className="Header__Navbar__leftmenu">
              <Button icon="projects" text="Products" minimal={true} />
              <Button icon="dollar" text="Pricing" minimal={true} />
              <Button icon="compass" text="About Us" minimal={true} />
            </Navbar.Group>
          </Navbar.Group>
          <Navbar.Group
            className="Header__Navbar__rightmenu"
            align={"right"}
            data-testid="rightSideMenu"
          >
            {rightSideMenu}
          </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.user.name,
    loggedIn: state.user.loggedIn
  };
};

export default connect(
  mapStateToProps,
  { logoutAccount }
)(Header);

Header.propTypes = {
  logoutAccount: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

Header.defaultProps = {
  name: "",
  loggedIn: false
};
