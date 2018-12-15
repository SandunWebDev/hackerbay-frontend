import React, { Component } from "react";
import PropTypes from "prop-types";

import { Icon } from "@blueprintjs/core";
import moment from "moment";

import "./WebsiteListItem.css";

export default class WebsiteListItem extends Component {
  render() {
    const { websiteName, url, onlineStatus, updatedAt } = this.props;
    const { token, websiteItemId, onDeleteAction } = this.props;

    const modifiedUpdatedAt = moment(updatedAt).fromNow();

    return (
      <div className="WebsiteListItem animation--cardLoading">
        <div className="WebsiteListItem__logo ">
          {/* Getting the first letter of url. */}
          <span className="WebsiteListItem__logo--text">
            {url.split("://")[1][0]}
          </span>
        </div>
        <div className="WebsiteListItem__mainInfo">
          <div
            className="WebsiteListItem__mainInfo__websiteName"
            title="Website's Name"
          >
            {websiteName}
          </div>
          <div className="WebsiteListItem__mainInfo__url" title="Website's URL">
            {url}
          </div>
        </div>
        <div className="WebsiteListItem__status" title="Website's Status">
          <div className="WebsiteListItem__status__icon">
            <Icon
              data-testid="onlineStatus"
              icon={onlineStatus ? "tick" : "warning-sign"}
              color={onlineStatus ? "rgb(102, 190, 90)" : "rgb(255, 187, 90)"}
            />
          </div>
          <div className="WebsiteListItem__status__updatedAt">
            Last Checked <br />@ {modifiedUpdatedAt}
          </div>
        </div>
        <div className="WebsiteListItem__toolbar">
          <div title="Update Now">
            <Icon icon="automatic-updates" iconSize="13" />
          </div>
          <div title="Edit">
            <Icon icon="edit" iconSize="13" />
          </div>
          <div
            title="Delete"
            data-testid="deleteButton"
            onClick={() => onDeleteAction(token, websiteItemId)}
          >
            <Icon icon="trash" iconSize="13" />
          </div>
          <div title="Notifications">
            <Icon icon="notifications-updated" iconSize="13" />
          </div>
        </div>
      </div>
    );
  }
}

WebsiteListItem.propTypes = {
  websiteItemId: PropTypes.string.isRequired,
  websiteName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onlineStatus: PropTypes.bool.isRequired,
  updatedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
  token: PropTypes.string.isRequired,
  onDeleteAction: PropTypes.func.isRequired
};

WebsiteListItem.defaultProps = {
  websiteItemId: "",
  websiteName: "Website Name",
  url: "http://website.url",
  onlineStatus: true,
  updatedAt: new Date(),
  token: "",
  onDeleteAction: () => {}
};
