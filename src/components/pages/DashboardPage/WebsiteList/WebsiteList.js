import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { actions as dashboardActions } from "../../../../redux/actions/dashboardActions";

import "./WebsiteList.css";

class WebsiteList extends Component {
  componentDidMount() {
    const { websiteListActions, token } = this.props;

    // Redux Action
    websiteListActions.loadAllWebsiteLinks(token);
  }

  render() {
    const { fullList } = this.props;

    return (
      <div className="WebsiteList">
        <div>WebSite List</div>
        <ul>
          {fullList.map((website, id) => {
            const {
              websiteName,
              url,
              onlineStatus,
              createdAt,
              updatedAt
            } = website;

            return [
              <li>{websiteName}</li>,
              <li>{url}</li>,
              <li>{onlineStatus}</li>,
              <li>{createdAt}</li>,
              <li>{updatedAt}</li>
            ];
          })}
        </ul>
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
