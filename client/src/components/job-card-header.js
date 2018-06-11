import React from "react";

import { Row, Col, Select } from "antd";

import ConfigData from "../config-data";

export default ({ sortBySelectedOption }) => {
  return (
    <Row className="styled-jobs-card-header">
      <Col span={12}>
        <h3>RESULTS</h3>
      </Col>
      <Col className="styled-sortby-item" span={12}>
        <Row gutter={16}>
          <Col span={12}>
            <h4>Sort by</h4>
          </Col>
          <Col span={12}>
            <Select
              defaultValue={ConfigData.sortOptions[0]}
              className="styled-select-filter"
              onChange={sortBySelectedOption}
            >
              {ConfigData.sortOptions.map(item => {
                return (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                );
              })}
            </Select>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
