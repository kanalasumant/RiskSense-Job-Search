import React, { Fragment } from "react";

import { Select } from "antd";

import FilterItem from "./filter-item";

export default ({
  title,
  data,
  localState,
  clearCountriesFilter,
  toggleCountriesFilter
}) => {
  return (
    <Fragment>
      <FilterItem title={title} clearFilter={clearCountriesFilter} />
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Enter Country Name"
        onChange={toggleCountriesFilter}
        value={localState}
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
