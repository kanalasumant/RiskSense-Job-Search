import React, { Fragment } from "react";

import { Checkbox, Slider, InputNumber } from "antd";

import FilterItem from "./filter-item";

export default ({
  title,
  data,
  localState,
  minPayValueChange,
  maxPayValueChange,
  togglePayRateSlider,
  toggleProfilesWithoutPayRate
}) => {
  return (
    <Fragment>
      <FilterItem title={title} clearFilter={this.clearFilter} />
      <InputNumber
        min={data.minPayValue}
        max={data.maxPayValue - 1}
        style={{ width: 50 }}
        value={localState.minPayValue}
        onChange={minPayValueChange}
      />
      <span className="styled-pay-rate-separator">-</span>
      <InputNumber
        min={data.minPayValue + 1}
        max={data.maxPayValue}
        style={{ width: 50 }}
        value={localState.maxPayValue}
        onChange={maxPayValueChange}
      />
      <Slider
        min={1}
        max={200}
        marks={data.marks}
        range={true}
        defaultValue={[data.defaultMinPayValue, data.defaultMaxPayValue]}
        onChange={togglePayRateSlider}
        value={[localState.minPayValue, localState.maxPayValue]}
      />
      <Checkbox
        checked={localState.profilesWithoutPayRate}
        onChange={toggleProfilesWithoutPayRate}
      >
        Include profiles without pay rates
      </Checkbox>
    </Fragment>
  );
};
