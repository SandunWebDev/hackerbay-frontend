import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Button,
  HTMLSelect,
  ControlGroup,
  InputGroup
} from "@blueprintjs/core";

import "./WebsiteListToolbar.css";

const allSelectTags = [
  {
    value: "websiteName",
    label: "Name",
    filterPlaceholder: "Enter Website Name To Filter."
  },
  { value: "url", label: "URL", filterPlaceholder: "Enter URL To Filter." },
  {
    value: "onlineStatus",
    label: "Status",
    filterPlaceholder: "Enter True / False To Filter."
  },
  {
    value: "createdAt",
    label: "Created At",
    filterPlaceholder: "Enter YYYY-MM-DD To Filter."
  },
  {
    value: "updatedAt",
    label: "Updated At",
    filterPlaceholder: "Enter YYYY-MM-DD To Filter."
  }
];

export default class WebsiteListToolbar extends Component {
  // Just a varialbe to stores value by without re-rendering when changed.
  tempState = {
    // Setting initial values.
    selectedFilterTag: allSelectTags[0].value,
    selectedFilterText: "",
    selectedFilterPlaceholder: allSelectTags[0].filterPlaceholder,
    selectedSortTag: allSelectTags[0].value,
    selectedSortOrder: "descending"
  };

  handleFilterTagSelection(e) {
    this.tempState.selectedFilterTag = e.target.value;

    this.tempState.selectedFilterPlaceholder = allSelectTags.find(
      i => i.value === e.target.value
    ).filterPlaceholder;

    this.handleSortAndFilter();
  }

  handleFilterTextChange(e) {
    this.tempState.selectedFilterText = e.target.value;
    this.handleSortAndFilter();
  }

  handleSortTagSelection(e) {
    this.tempState.selectedSortTag = e.target.value;
    this.handleSortAndFilter();
  }

  handleSortOrderSelection(order) {
    this.tempState.selectedSortOrder = order;
    this.handleSortAndFilter();
  }

  handleSortAndFilter(e) {
    // Redux Actions, and States
    const {
      sortAndFilter,
      fullList,
      currentSortedAndFilteredList
    } = this.props;

    // Temp Local State
    const {
      selectedFilterTag,
      selectedFilterText,
      selectedSortTag,
      selectedSortOrder
    } = this.tempState;

    sortAndFilter(
      fullList,
      currentSortedAndFilteredList,
      selectedFilterTag,
      selectedFilterText,
      selectedSortTag,
      selectedSortOrder
    );
  }

  componentDidMount() {
    this.handleSortAndFilter();
  }

  render() {
    const { selectedSortOrder, selectedFilterPlaceholder } = this.tempState;

    const tagOptionItems = allSelectTags.map((tag, id) => {
      return (
        <option value={tag.value} key={id}>
          {tag.label}
        </option>
      );
    });

    return (
      <div className="WebsiteListToolbar">
        <ControlGroup vertical={false}>
          <Button icon="filter" minimal={true} intent="warning" disabled={true}>
            Filter By
          </Button>
          <HTMLSelect
            data-testid="filterTagSelector"
            title="Filter"
            onChange={e => this.handleFilterTagSelection(e)}
          >
            {tagOptionItems}
          </HTMLSelect>
          <InputGroup
            data-testid="filterTagTextBox"
            id="filterText"
            onChange={e => this.handleFilterTextChange(e)}
            placeholder={selectedFilterPlaceholder}
          />
        </ControlGroup>

        <ControlGroup vertical={false}>
          <Button icon="sort" intent="warning" minimal={true} disabled={true}>
            Sort By
          </Button>
          <HTMLSelect
            data-testid="sortTagSelector"
            title="Sort By"
            onChange={e => this.handleSortTagSelection(e)}
          >
            {tagOptionItems}
          </HTMLSelect>
          <Button
            data-testid="sortDescendingButton"
            icon="sort-alphabetical"
            title="Decending"
            intent={selectedSortOrder === "descending" ? "primary" : "none"}
            onClick={e => this.handleSortOrderSelection("descending")}
          />
          <Button
            data-testid="sortAscendingButton"
            icon="sort-alphabetical-desc"
            title="Ascending"
            intent={selectedSortOrder === "ascending" ? "primary" : "none"}
            onClick={e => this.handleSortOrderSelection("ascending")}
          />
        </ControlGroup>
      </div>
    );
  }
}

WebsiteListToolbar.propTypes = {
  sortAndFilter: PropTypes.func.isRequired,
  fullList: PropTypes.array.isRequired,
  currentSortedAndFilteredList: PropTypes.array.isRequired
};

WebsiteListToolbar.defaultProps = {
  sortAndFilter: () => {},
  fullList: [],
  currentSortedAndFilteredList: []
};
