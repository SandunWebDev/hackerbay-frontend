import React, { Component } from "react";
import PropTypes from "prop-types";

import { Spinner, Icon, Button } from "@blueprintjs/core";
import moment from "moment";

import "./WebsiteList.css";

export default class WebsiteList extends Component {
  componentDidMount() {
    const { websiteListActions, token } = this.props;

    // Redux Action
    websiteListActions.loadAllWebsiteLinks(token);
  }

  render() {
    const { fullList, isFetching, error } = this.props.websiteListReduxState;
    const { websiteListActions, token } = this.props;

    if (isFetching) {
      return (
        <div className="WebsiteList">
          <Spinner intent={"success"} size={100} />
        </div>
      );
    }

    if (error) {
      return (
        <div className="WebsiteList">
          <div className="WebsiteList--error">
            <div>
              <Icon icon="disable" iconSize="30" />
              <div>{error}</div>
              <div className="WebsiteList--error__reloadButton">
                <Button
                  icon="refresh"
                  text="Reload"
                  onClick={() => websiteListActions.loadAllWebsiteLinks(token)}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (fullList.length === 0) {
      return (
        <div className="WebsiteList">
          <div className="WebsiteList--noItems">
            <div>
              <Icon icon="filter-remove" iconSize="30" />
              <div>Hi, Seems like you haven't added any websites yet.</div>
              <div> Try adding website by clicking on above button.</div>
            </div>
          </div>
        </div>
      );
    }

    if (fullList.length === 0) {
      return (
        <div className="WebsiteList">
          <div className="WebsiteList--noItems">
            <div>
              <Icon icon="filter-remove" iconSize="30" />
              <div>Hi, Seems like you haven't added any websites yet.</div>
              <div> Try adding website by clicking on above button.</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="WebsiteList">
        {fullList.map((website, id) => {
          const { websiteName, url, onlineStatus, updatedAt } = website;

          const modifiedUpdatedAt = moment(updatedAt).fromNow();

          return (
            <div className="WebsiteList__item animation--cardLoading" key={id}>
              <div className="WebsiteList__item__logo ">
                {/* Getting the first letter of url. */}
                <span className="WebsiteList__item__logo--text">
                  {url.split("://")[1][0]}
                </span>
              </div>
              <div className="WebsiteList__item__mainInfo">
                <div
                  className="WebsiteList__item__mainInfo__websiteName"
                  title="Website's Name"
                >
                  {websiteName}
                </div>
                <div
                  className="WebsiteList__item__mainInfo__url"
                  title="Website's URL"
                >
                  {url}
                </div>
              </div>
              <div
                className="WebsiteList__item__status"
                title="Website's Status"
              >
                <div className="WebsiteList__item__status__icon">
                  <Icon
                    icon={onlineStatus ? "tick" : "warning-sign"}
                    color={
                      onlineStatus ? "rgb(102, 190, 90)" : "rgb(255, 187, 90)"
                    }
                  />
                </div>
                <div className="WebsiteList__item__status__updatedAt">
                  Last Checked <br />@ {modifiedUpdatedAt}
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

WebsiteList.propTypes = {
  websiteListReduxState: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    fullList: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.string.isRequired
  }).isRequired,
  websiteListActions: PropTypes.shape({
    loadAllWebsiteLinks: PropTypes.func.isRequired
  }).isRequired,
  token: PropTypes.string.isRequired
};

WebsiteList.defaultProps = {
  websiteListReduxState: {
    isFetching: false,
    fullList: [],
    error: ""
  },
  websiteListActions: {
    loadAllWebsiteLinks: () => {}
  },
  token: ""
};
