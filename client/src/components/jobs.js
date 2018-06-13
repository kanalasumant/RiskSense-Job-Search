import React, { Fragment } from "react";

import { Card } from "antd";

import JobCardHeader from "./job-card-header";
import JobInfoItem from "./job-info-item";

export default ({ toggleSortByFilter, data, results }) => {
  return (
    <Card className="styled-jobs-card">
      {results.length === 0 ? (
        <div>No results! Try modifying the filters for better accuracy</div>
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
