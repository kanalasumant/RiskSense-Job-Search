import React from "react";

import { Card } from "antd";

import JobCardHeader from "./job-card-header";
import JobInfoItem from "./job-info-item";

export default ({ toggleSortByFilter, data }) => {
  return (
    <Card className="styled-jobs-card">
      <JobCardHeader data={data} sortBySelectedOption={toggleSortByFilter} />
      <JobInfoItem />
    </Card>
  );
};
