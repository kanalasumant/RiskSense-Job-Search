import React, { Fragment } from "react";

import { Select } from "antd";

import FilterItem from "./filter-item";

export default ({ title, data, toggleCountriesFilter }) => {
  return (
    <Fragment>
      <FilterItem title={title} clearFilter={this.clearFilter} />
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Enter Country Name"
        onChange={toggleCountriesFilter}
      >
        {data.map(item => {
          return (
            <Select.Option key={item.code} value={item.code}>
              {item.country}
            </Select.Option>
          );
        })}
      </Select>
    </Fragment>
  );
};
