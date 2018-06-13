import React, { Fragment } from "react";

import { Checkbox, Row } from "antd";

import FilterItem from "./filter-item";

export default ({
  title,
  data,
  localState,
  clearAvailabilityFilter,
  toggleAvailabilityFilter
}) => {
  return (
    <Fragment>
      <FilterItem title={title} clearFilter={clearAvailabilityFilter} />
      {data.map(item => {
        return (
          <Row key={item.label}>
            <Checkbox
              checked={localState[item.boolValue]}
              onChange={() => toggleAvailabilityFilter(item.boolValue)}
            >
              {item.label}
            </Checkbox>
          </Row>
        );
      })}
    </Fragment>
  );
};
