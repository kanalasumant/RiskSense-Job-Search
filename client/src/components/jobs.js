import React, { Component } from "react";

import { Card } from "antd";

import JobCardHeader from "./job-card-header";
import JobInfoItem from "./job-info-item";

export default class Jobs extends Component {
  state = {};

  calledMe = value => {
    console.log(value);
  };

  render() {
    return (
      <Card className="styled-jobs-card">
        <JobCardHeader sortBySelectedOption={this.calledMe} />
        <JobInfoItem />
      </Card>
    );
  }
}
