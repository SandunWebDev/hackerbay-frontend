import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navbar, Button, Icon } from "@blueprintjs/core";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAccount } from "../../../redux/actions/userActions";

import "./Header.css";

export class Header extends Component {
  state = {
    isMobileMenuOpen: false
  };

  handleMobieMenuState() {
    // This function flip the current state of mobile menu.

    const { isMobileMenuOpen } = this.state;

    this.setState({
      isMobileMenuOpen: isMobileMenuOpen ? false : true
    });
  }

  render() {
    const { loggedIn, name, logoutAccount } = this.props;
    const { isMobileMenuOpen } = this.state;

    // Condionally rendering right side menu according user is logged in or not.
    let rightSideMenu = "";
    if (loggedIn) {
      rightSideMenu = [
        <Link to="/dashboard">
          <Button icon="dashboard" text="Dashboard" minimal={true} />
        </Link>,
        <Link to="/myaccount">
          <Button
            icon="user"
            minimal={true}
            data-testid="myAccountButton"
            className="Header__Navbar__leftmenu__username"
          >
            {name.split(" ")[0]}
          </Button>
        </Link>,
        <Link to="/login">
          <Button
            icon="log-out"
            minimal={true}
            onClick={logoutAccount}
            data-testid="logoutButton"
          >
            LogOut
          </Button>
        </Link>
      ];
    } else {
      rightSideMenu = [
        <Link to="/signup">
          <Button icon="badge" minimal={true}>
            Signup
          </Button>
        </Link>,

        <Link to="/login">
          <Button icon="log-in" minimal={true}>
            Login
          </Button>
        </Link>
      ];
    }

    const leftsideMenu = [
      <Link to="/">
        <Button icon="projects" text="Services" minimal={true} />
      </Link>,
      <Link to="/">
        <Button icon="dollar" text="Pricing" minimal={true} />
      </Link>,
      <Link to="/">
        <Button icon="compass" text="About Us" minimal={true} />
      </Link>
    ];

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
            <Navbar.Divider className="Header__Navbar__devider" />
            <Navbar.Group className="Header__Navbar__leftmenu">
              {leftsideMenu}
            </Navbar.Group>
          </Navbar.Group>
          <Navbar.Group
            className="Header__Navbar__rightmenu"
            align={"right"}
            data-testid="rightSideMenu"
          >
            {rightSideMenu}
          </Navbar.Group>
          <Navbar.Group
            className="Header__Navbar__mobilemenuIcon"
            align={"right"}
            data-testid="rightSideMenu"
            onClick={() => this.handleMobieMenuState()}
          >
            <Icon icon="menu" />
          </Navbar.Group>
        </Navbar>

        {isMobileMenuOpen && (
          <div
            className="Header__mobileMenu"
            onClick={() => this.handleMobieMenuState()}
          >
            <div className="Header__mobileMenu__links">
              {leftsideMenu}
              <hr />
              {rightSideMenu}
            </div>
          </div>
        )}
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
