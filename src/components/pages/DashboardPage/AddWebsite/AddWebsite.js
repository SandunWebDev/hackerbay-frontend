import React, { Component } from "react";

import AddWebsiteForm from "../../../forms/AddWebsiteForm/AddWebsiteForm";
import { Icon } from "@blueprintjs/core";

import "./AddWebsite.css";

export default class AddWebsite extends Component {
  state = {
    isOpen: this.props.isOpen || false
  };

  handleIsOpenState(forceIsOpenState) {
    const { isOpen } = this.state;

    const nextIsOpen = isOpen ? false : true;

    this.setState({
      isOpen: nextIsOpen
    });
  }

  render() {
    const { isOpen } = this.state;

    if (isOpen) {
      return (
        <div className="AddWebsite">
          <div className="AddWebsite--open">
            <AddWebsiteForm {...this.props} />
            <Icon
              className="AddWebsite__closeButton"
              icon="cross"
              onClick={() => this.handleIsOpenState()}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="AddWebsite">
          <div
            className="AddWebsite--closed"
            onClick={() => this.handleIsOpenState()}
          >
            <div>
              <Icon icon="add" iconSize="25" />
              <div>Add Website</div>
            </div>
          </div>
        </div>
      );
    }
  }
}
