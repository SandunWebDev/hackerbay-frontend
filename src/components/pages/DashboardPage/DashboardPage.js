import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as dashboardActions } from "../../../redux/actions/dashboardActions";

import { Icon } from "@blueprintjs/core";

import WebsiteList from "./WebsiteList/WebsiteList";
import AddWebsite from "./AddWebsite/AddWebsite";

import "./DashboardPage.css";

class DashboardPage extends Component {
  render() {
    const { addWebsite, websiteActions, token } = this.props;
    return (
      <div className="DashboardPage">
        <div className="DashboardPage__heading">
          <Icon icon="dashboard" />
          DASHBOARD
        </div>
        <div className="DashboardPage__mainSections">
          <div className="DashboardPage__mainSections__topBar">
            <div className="DashboardPage__mainSections--item">
              <div className="info">
                <div>SITES</div>
                <div>10</div>
              </div>
            </div>
            <div className="DashboardPage__mainSections--item">2</div>
            <div className="DashboardPage__mainSections--item">3</div>
            <div className="DashboardPage__mainSections--item">
              <Icon icon="add" />
            </div>
          </div>
          <div className="DashboardPage__mainSections--item">
            <AddWebsite
              addWebsiteReduxState={addWebsite}
              onSubmitAction={websiteActions.addWebsite}
              token={token}
            />
          </div>
          <div className="DashboardPage__mainSections--item">
            <WebsiteList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.dashboard, token: state.user.token };
};

const mapActionsToProps = dispatch => {
  return {
    websiteListActions: bindActionCreators(
      dashboardActions.websiteListActions,
      dispatch
    ),
    websiteActions: bindActionCreators(
      dashboardActions.websiteActions,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DashboardPage);
