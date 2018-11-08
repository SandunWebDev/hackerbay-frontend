import React, { Component } from "react";

import securePage from "../../hoc/securePage";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as dashboardActions } from "../../../redux/actions/dashboardActions";

import { Icon } from "@blueprintjs/core";

import WebsiteList from "./WebsiteList/WebsiteList";
import AddWebsite from "./AddWebsite/AddWebsite";

import "./DashboardPage.css";

class DashboardPage extends Component {
  render() {
    const {
      addWebsite: addWebsiteReduxState,
      websiteList: websiteListReduxState,
      websiteActions,
      websiteListActions,
      token
    } = this.props;

    const isWebsiteListFetching = websiteListReduxState.isFetching;
    const websiteListFetchingError = websiteListReduxState.error;

    const fullWebsiteList = websiteListReduxState.fullList;
    const noOfSites = fullWebsiteList.length;

    let noOfOnlineSites = 0,
      noOfOfflineSites = 0;

    // Calulating How many sites are online & offline
    fullWebsiteList.forEach(site => {
      if (site.onlineStatus) {
        noOfOnlineSites++;
      } else {
        noOfOfflineSites++;
      }
    });

    return (
      <div className="DashboardPage animation--pageTransition">
        <div className="DashboardPage__heading">
          <Icon icon="dashboard" />
          DASHBOARD
        </div>
        <div className="DashboardPage__mainSections">
          <div
            className={`DashboardPage__mainSections__topBar ${
              isWebsiteListFetching || websiteListFetchingError
                ? "DashboardPage__mainSections__topBar--hide"
                : ""
            }`}
          >
            <div className="DashboardPage__mainSections--item">
              <div className="DashboardSmallInfo DashboardSmallInfo--sites">
                <div className="DashboardSmallInfo__info">{noOfSites}</div>
                <div className="DashboardSmallInfo__title">
                  <Icon icon="globe-network" />
                  <span>SITES</span>
                </div>
              </div>
            </div>
            <div className="DashboardPage__mainSections--item">
              <div className="DashboardSmallInfo DashboardSmallInfo--online">
                <div className="DashboardSmallInfo__info">
                  {noOfOnlineSites}
                </div>
                <div className="DashboardSmallInfo__title">
                  <Icon icon="feed" />
                  <span> ONLINE</span>
                </div>
              </div>
            </div>
            <div className="DashboardPage__mainSections--item">
              <div className="DashboardSmallInfo DashboardSmallInfo--offline">
                <div className="DashboardSmallInfo__info">
                  {noOfOfflineSites}
                </div>
                <div className="DashboardSmallInfo__title">
                  <Icon icon="disable" />
                  <span> OFFLINE</span>
                </div>
              </div>
            </div>
          </div>
          <div className="DashboardPage__mainSections--item">
            <AddWebsite
              addWebsiteReduxState={addWebsiteReduxState}
              onSubmitAction={websiteActions.addWebsite}
              token={token}
            />
          </div>
          <div className="xyz DashboardPage__mainSections--item">
            <WebsiteList
              websiteListReduxState={websiteListReduxState}
              websiteListActions={websiteListActions}
              token={token}
            />
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
