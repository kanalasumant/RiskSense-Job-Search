import React, { Component, Fragment } from "react";

import { message, Checkbox, Slider, InputNumber } from "antd";

import ConfigData from "../config-data";
import FilterItem from "./filter-item";

const handleOverflow = (value, element) => {
  return element === "minPayValue"
    ? value >= ConfigData.payRate.minPayValue &&
        value <= ConfigData.payRate.maxPayValue - 1
    : value >= ConfigData.payRate.minPayValue + 1 &&
        value <= ConfigData.payRate.maxPayValue;
};

export default class PayRateFilter extends Component {
  state = {
    profilesWithoutPayRate: true,
    minPayValue: ConfigData.payRate.defaultMinPayValue,
    maxPayValue: ConfigData.payRate.defaultMaxPayValue
  };

  minPayValueChange = value => {
    if (handleOverflow(value, "minPayValue")) {
      if (value < this.state.maxPayValue)
        this.setState({
          minPayValue: value
        });
      else
        message.error(
          `Please enter a value less than ${this.state.maxPayValue}`
        );
    } else {
      message.error(
        `Please enter a value between ${
          ConfigData.payRate.minPayValue
        } and ${ConfigData.payRate.maxPayValue - 1}`
      );
    }
  };

  maxPayValueChange = value => {
    if (handleOverflow(value, "maxPayValue")) {
      if (value > this.state.minPayValue)
        this.setState({
          maxPayValue: value
        });
      else
        message.error(
          `Please enter a value greater than ${this.state.minPayValue}`
        );
    } else {
      message.error(
        `Please enter a value between ${ConfigData.payRate.minPayValue +
          1} and ${ConfigData.payRate.maxPayValue}`
      );
    }
  };

  toggleProfilesWithoutPayRate = () => {
    this.setState(prevState => ({
      profilesWithoutPayRate: !prevState.profilesWithoutPayRate
    }));
  };

  toggleSlider = value => {
    const [minPayValue, maxPayValue] = value;
    this.setState({ minPayValue, maxPayValue });
  };

  render() {
    return (
      <Fragment>
        <FilterItem title="Pay Rate/hr ($)" clearFilter={this.clearFilter} />
        <InputNumber
          min={ConfigData.payRate.minPayValue}
          max={ConfigData.payRate.maxPayValue - 1}
          style={{ width: 50 }}
          value={
            this.state.minPayValue || ConfigData.payRate.defaultMaxPayValue
          }
          onChange={this.minPayValueChange}
        />
        <span className="styled-pay-rate-separator">-</span>
        <InputNumber
          min={ConfigData.payRate.minPayValue + 1}
          max={ConfigData.payRate.maxPayValue}
          style={{ width: 50 }}
          value={
            this.state.maxPayValue || ConfigData.payRate.defaultMinPayValue
          }
          onChange={this.maxPayValueChange}
        />
        <Slider
          min={1}
          max={200}
          marks={ConfigData.payRate.marks}
          range={true}
          defaultValue={[
            ConfigData.payRate.defaultMinPayValue,
            ConfigData.payRate.defaultMaxPayValue
          ]}
          onChange={this.toggleSlider}
          value={[
            this.state.minPayValue || ConfigData.payRate.defaultMinPayValue,
            this.state.maxPayValue || ConfigData.payRate.defaultMaxPayValue
          ]}
        />
        <Checkbox
          checked={this.state.profilesWithoutPayRate}
          onChange={this.toggleProfilesWithoutPayRate}
        >
          Include profiles without pay rates
        </Checkbox>
      </Fragment>
    );
  }
}
