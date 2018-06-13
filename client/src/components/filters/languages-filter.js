import React, { Fragment } from "react";

import { Select } from "antd";

import FilterItem from "./filter-item";

export default ({
  title,
  data,
  localState,
  clearLanguagesFilter,
  toggleLanguagesFilter
}) => {
  return (
    <Fragment>
      <FilterItem title={title} clearFilter={clearLanguagesFilter} />
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Enter a language"
        onChange={toggleLanguagesFilter}
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
