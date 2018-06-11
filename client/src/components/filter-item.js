import React from "react";

import { Row, Col } from "antd";

export default ({ title, clearFilter }) => {
  return (
    <Row className="styled-filter-item">
      <Col span={12}>
        {title === "FILTERS" ? <h3>{title}</h3> : <h4>{title}</h4>}
      </Col>
      <Col span={12}>
        <h4 onClick={clearFilter} className="styled-clear-filter-item">
          {title === "FILTERS" ? "Clear all filters" : "Clear"}
        </h4>
      </Col>
    </Row>
  );
};
