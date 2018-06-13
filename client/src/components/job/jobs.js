import React, { Fragment } from "react";

import { Card } from "antd";

import JobCardHeader from "./job-card-header";
import JobInfoItem from "./job-info-item";

import "./scss/job.scss";

export default ({ toggleSortByFilter, data, results }) => {
  return (
    <Card className="styled-jobs-card">
      {results.length === 0 ? (
        <div>Search for jobs by modifying the filters for better accuracy</div>
      ) : (
        <Fragment>
          <JobCardHeader
            data={data}
            sortBySelectedOption={toggleSortByFilter}
          />
          <JobInfoItem results={results} />
        </Fragment>
      )}
    </Card>
  );
};
