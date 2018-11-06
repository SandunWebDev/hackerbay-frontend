import React, { Component } from "react";

import WebsiteList from "./WebsiteList/WebsiteList";

import "./DashboardPage.css";

export default class DashboardPage extends Component {
  render() {
    return (
      <div className="DashboardPage">
        <div>DASHBOARD PAGE</div>
        <WebsiteList />
      </div>
    );
  }
}
