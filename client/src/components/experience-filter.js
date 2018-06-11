import React, { Fragment } from "react";

import { Select, Tooltip } from "antd";

import FilterItem from "./filter-item";

export default ({ title, data, toggleExperienceFilter }) => {
  return (
    <Fragment>
      <FilterItem title={title} clearFilter={this.clearFilter} />
      <Select
        showArrow
        className="styled-select-filter"
        placeholder="Select your experience level"
        onChange={toggleExperienceFilter}
      >
        {data.map(item => {
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
};
