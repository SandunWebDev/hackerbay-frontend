import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Icon } from "@blueprintjs/core";

import "./HomePage.css";
import serverMonitoringPhoto from "../../../assets/images/serverMonitoring.svg";

export default class HomePage extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className="HomePage animation--pageTransition">
        <div>
          <h1 className="animation--textExpand">Hackerbay Server Monitoring</h1>
          <h2 className="animation--textExpand">
            Status Page, Monitoring and On-call made simple.
          </h2>

          <div className="HomePage__mainArea">
            <div className="HomePage__mainArea__descriptions">
              <p>
                Hackerbay monitors your website, dashboards, API's, and more and
                alerts your team when downtime happens. We also give you a
                Status Page which keeps your customers looped in and improves
                transparency.
              </p>
            </div>
            <div className="HomePage__mainArea__photo">
              <img src={serverMonitoringPhoto} alt="Server Monitoring" />
            </div>
          </div>
          <div className="HomePage__links">
            {isLoggedIn ? (
              <div>
                <Link to="/dashboard">
                  <span className="HomePage__dashboardButton">
                    <Icon icon="dashboard" />
                    <span> Dashboard</span>
                  </span>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <span className="HomePage__loginButton">
                    <Icon icon="log-in" />
                    <span>Login</span>
                  </span>
                </Link>
                <span>Or</span>
                <Link to="/signup">
                  <span className="HomePage__signupButton">
                    <Icon icon="badge" />
                    <span>Signup</span>
                  </span>
                </Link>
              </div>
            )}
            <span>
              {isLoggedIn ? "Let's Goto Dashbaord." : "To Get Started."}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

HomePage.defaultProps = {
  isLoggedIn: false
};
