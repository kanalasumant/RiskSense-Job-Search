import React, { Component } from "react";

import { Select, Tooltip } from "antd";

import ConfigData from "../config-data";
import FilterItem from "./filter-item";

import "../App.css";

export default class JobTypeFilter extends Component {
  state = {
    selectedValue: ""
  };

  handleChange = value => {
    this.setState({
      selectedValue: value
    });
  };

  render() {
    return (
      <Fragment>
        <FilterItem title="Experience level" clearFilter={this.clearFilter} />
        <Select
          showArrow
          className="styled-select-filter"
          placeholder="Select your experience level"
          onChange={this.handleChange}
        >
          {ConfigData.experienceLevels.map(item => {
            const valueToDisplay = item.split("_").join(" ");
            return (
              <Select.Option key={item} value={item}>
                <Tooltip placement="right" title={valueToDisplay}>
                  {valueToDisplay}
                </Tooltip>
              </Select.Option>
            );
          })}
        </Select>
      </Fragment>
    );
  }
}
