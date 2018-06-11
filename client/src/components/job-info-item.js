import React, { Fragment } from "react";

import { Row, Col, Badge, Divider, Icon } from "antd";

export default () => {
  return (
    <Row className="styled-job-info-item-header">
      <Col span={20}>
        <h3 className="styled-job-info-item-title">Hello</h3>
        <span>
          <Badge
            style={{
              backgroundColor: false ? "#56d48f" : true ? "#4bd3ff" : "#ffc14a"
            }}
            count="Full Time"
          />
        </span>
      </Col>
      <Col span={4}>
        <h3 className="styled-job-info-item-payrate">$44 / hr</h3>
      </Col>
      <Col span={24}>
        <Icon type="table" />
        <span>Company</span>
        <Icon type="environment-o" />
        <span>Company</span>
      </Col>
      <Col span={24}>
        <p>Description</p>
      </Col>
      <Col span={24}>
        <Divider className="styled-job-info-item-divider" />
      </Col>
    </Row>
  );
};
