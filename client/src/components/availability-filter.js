import React, { Component, Fragment } from "react";

import { Checkbox, Row } from "antd";

import ConfigData from "../config-data";
import FilterItem from "./filter-item";

export default class AvailabilityFilter extends Component {
  state = {
    hourly: false,
    partTime: false,
    fullTime: false
  };

  clickMe = boolValue => {
    this.setState(prevState => {
      switch (boolValue) {
        case "hourly":
          return { hourly: !prevState[boolValue] };
        case "partTime":
          return { partTime: !prevState[boolValue] };
        case "fullTime":
          return { fullTime: !prevState[boolValue] };
      }
    });
  };

  render() {
    return (
      <Fragment>
        <FilterItem title="Availability" clearFilter={this.clearFilter} />
        {ConfigData.availability.map(item => {
          return (
            <Row key={item.label}>
              <Checkbox
                checked={this.state[item.boolValue]}
                onChange={() => this.clickMe(item.boolValue)}
              >
                {item.label}
              </Checkbox>
            </Row>
          );
        })}
      </Fragment>
    );
  }
}
