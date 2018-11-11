import React, { Component } from "react";
import PropTypes from "prop-types";

import { Spinner, Icon, Button } from "@blueprintjs/core";

import WebsiteListItem from "./WebsiteListItem/WebsiteListItem";

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
          <div className="WebsiteList--fetching">
            <Spinner intent={"success"} size={100} />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="WebsiteList">
          <div className="WebsiteList--error">
            <div>
              <Icon icon="disable" iconSize="30" />
              <div data-testid="errorMsg">{error}</div>
              <div className="WebsiteList--error__reloadButton">
                <Button
                  icon="refresh"
                  text="Reload"
                  onClick={() => websiteListActions.loadAllWebsiteLinks(token)}
                  data-testid="reloadButton"
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

    return (
      <div className="WebsiteList">
        {fullList.map((website, id) => {
          const { websiteName, url, onlineStatus, updatedAt } = website;

          return (
            <WebsiteListItem
              key={id}
              websiteName={websiteName}
              url={url}
              onlineStatus={onlineStatus}
              updatedAt={updatedAt}
            />
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
