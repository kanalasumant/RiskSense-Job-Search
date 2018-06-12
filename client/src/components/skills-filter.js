import React, { Fragment } from "react";

import { Select } from "antd";

import FilterItem from "./filter-item";

export default ({
  title,
  data,
  localState,
  clearSkillsFilter,
  toggleSkillsFilter
}) => {
  return (
    <Fragment>
      <FilterItem title={title} clearFilter={clearSkillsFilter} />
      <Select
        mode="multiple"
        className="styled-select-filter"
        placeholder="Select skills from the list"
        onChange={toggleSkillsFilter}
        value={localState}
      >
        {data.map(item => {
          return (
            <Select.OptGroup key={item.group} label={item.group}>
              {item.options.map(groupItem => {
                return (
                  <Select.Option key={groupItem.value} value={groupItem.value}>
                    {groupItem.value}
                  </Select.Option>
                );
              })}
            </Select.OptGroup>
          );
        })}
      </Select>
    </Fragment>
  );
};
