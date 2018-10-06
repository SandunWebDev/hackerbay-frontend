import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navbar, Button } from "@blueprintjs/core";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAccount } from "../../../redux/actions/userActions";

import "./Header.css";

export class Header extends Component {
  render() {
    const { logoutAccount } = this.props;
    const { loggedIn, name } = this.props.user;

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
      <div className="Header">
        <Navbar className="Header__Navbar bp3-dark" fixedToTop={true}>
          <Navbar.Group align={"left"}>
            <Navbar.Heading className="Header__Navbar__heading">
              <Link to="/">
                <Button icon="search-around" minimal={true}>
                  HACKERBAY
                </Button>
              </Link>
            </Navbar.Heading>
            <Navbar.Divider />
            <Navbar.Group className="Header__Navbar__leftmenu">
              <Button icon="projects" text="Products" minimal={true} />
              <Button icon="dollar" text="Pricing" minimal={true} />
              <Button icon="dashboard" text="Dashboard" minimal={true} />
              <Button icon="compass" text="About Us" minimal={true} />
            </Navbar.Group>
          </Navbar.Group>
          <Navbar.Group className="Header__Navbar__rightmenu" align={"right"}>
            {rightSideMenu}
          </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  { logoutAccount }
)(Header);

Header.propTypes = {
  logoutAccount: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired
  })
};
