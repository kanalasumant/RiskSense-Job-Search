import React, { Fragment } from "react";

import { Row, Col, Badge, Divider, Icon } from "antd";

export default ({ results }) => {
  return (
    <Fragment>
      {results.map((job, index) => {
        return (
          <Row key={job.dateAdded} className="styled-job-info-item-header">
            <Col span={20}>
              <h3 className="styled-job-info-item-title styled-job-info-item-bolder">
                {job.role.title}
              </h3>
              <span>
                <Badge
                  style={{
                    padding: "0 12px",
                    backgroundColor:
                      job.availability === "hourly"
                        ? "#56d48f"
                        : job.availability === "full-time"
                          ? "#4bd3ff"
                          : "#ffc14a"
                  }}
                  count={job.availability}
                />
              </span>
            </Col>
            <Col span={4}>
              {job.payRate ? (
                <h3 className="styled-job-info-item-payrate styled-job-info-item-bolder">
                  ${job.payRate} / hr
                </h3>
              ) : null}
            </Col>
            <Col className="styled-job-info-item-bold" span={24}>
              <Icon
                className="styled-job-info-item-company-secondary-color"
                type="table"
              />
              <span className="styled-job-info-item-company-secondary-color styled-job-info-item-company-text">
                {job.role.company}
              </span>
              <Icon
                className="styled-job-info-item-company-primary-color"
                type="environment-o"
              />
              <span className="styled-job-info-item-company-primary-color styled-job-info-item-company-text">
                {job.role.area}
              </span>
            </Col>
            <Col className="styled-job-info-item-company-description" span={24}>
              <p>
                {job.role.description.length <= 125
                  ? job.role.description
                  : job.role.description.slice(0, 125)}...
              </p>
            </Col>
            {results.length - 1 === index ? null : (
              <Col span={24}>
                <Divider className="styled-job-info-item-divider" />
              </Col>
            )}
          </Row>
        );
      })}
    </Fragment>
  );
};
