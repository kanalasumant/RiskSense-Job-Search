import React, { Component, Fragment } from "react";

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
        <FilterItem title="Job Type" clearFilter={this.clearFilter} />
        <Select
          showArrow
          className="styled-select-filter"
          placeholder="Select a Job Type"
          onChange={this.handleChange}
        >
          {ConfigData.jobType.map(item => {
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
