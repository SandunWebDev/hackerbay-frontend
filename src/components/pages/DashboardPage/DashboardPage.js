import React, { Component } from "react";

import { Icon } from "@blueprintjs/core";

import WebsiteList from "./WebsiteList/WebsiteList";

import "./DashboardPage.css";

export default class DashboardPage extends Component {
  render() {
    return (
      <div className="DashboardPage">
        <div className="DashboardPage__heading">
          <Icon icon="dashboard" />
          DASHBOARD
        </div>
        <div>
          <WebsiteList />
        </div>
      </div>
    );
  }
}
