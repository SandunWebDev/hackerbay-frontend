import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as dashboardActions } from "../../../../redux/actions/dashboardActions";

import { Spinner, Icon } from "@blueprintjs/core";
import moment from "moment";

import "./WebsiteList.css";

class WebsiteList extends Component {
  componentDidMount() {
    const { websiteListActions, token } = this.props;

    // Redux Action
    websiteListActions.loadAllWebsiteLinks(token);
  }

  render() {
    let { fullList, isFetching } = this.props;

    if (isFetching) {
      return (
        <div className="WebsiteList">
          <Spinner intent={"success"} size={100} />
        </div>
      );
    }

    return (
      <div className="WebsiteList">
        {fullList.map((website, id) => {
          const { websiteName, url, onlineStatus, updatedAt } = website;

          const modifiedUpdatedAt = moment(updatedAt).fromNow();

          return (
            <div className="WebsiteList__item" key={id}>
              <div className="WebsiteList__item__logo ">
                {/* Getting the first letter of url. */}
                <span className="WebsiteList__item__logo--text">
                  {url.split("://")[1][0]}
                </span>
              </div>
              <div className="WebsiteList__item__mainInfo">
                <div className="WebsiteList__item__mainInfo__websiteName">
                  {websiteName}
                </div>
                <div className="WebsiteList__item__mainInfo__url">{url}</div>
              </div>
              <div className="WebsiteList__item__status">
                <div className="WebsiteList__item__status__icon">
                  <Icon
                    icon={onlineStatus ? "tick-circle" : "warning-sign"}
                    color={
                      onlineStatus ? "rgb(102, 190, 90)" : "rgb(255, 187, 90)"
                    }
                  />
                </div>
                <div className="WebsiteList__item__status__updatedAt">
                  Last Checked @ {modifiedUpdatedAt}
                </div>
              </div>
              <div className="WebsiteList__item__toolbar">
                <div title="Update Now">
                  <Icon icon="automatic-updates" iconSize="13" />
                </div>
                <div title="Edit">
                  <Icon icon="edit" iconSize="13" />
                </div>
                <div title="Delete">
                  <Icon icon="trash" iconSize="13" />
                </div>
                <div title="Notifications">
                  <Icon icon="notifications-updated" iconSize="13" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.dashboard.websiteList,
    token: state.user.token
  };
}

function mapActionsToProps(dispatch) {
  return {
    websiteListActions: bindActionCreators(
      dashboardActions.websiteListActions,
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(WebsiteList);

WebsiteList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fullList: PropTypes.arrayOf(PropTypes.object).isRequired,
  token: PropTypes.string.isRequired
};

WebsiteList.defaultProps = {
  isFetching: false,
  error: "",
  fullList: [],
  token: ""
};
