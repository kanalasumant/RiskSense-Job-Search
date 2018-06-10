import React, { Component, Fragment } from "react";

import { Divider } from "antd";

import AvailabilityFilter from "./availability-filter";
import JobTypeFilter from "./job-type-filter";
import PayRateFilter from "./pay-rate-filter";
import FilterItem from "./filter-item";
// import ExperienceFilter from "./experience-filter";
// import CountriesFilter from "./countries-filter";
// import LanguagesFilter from "./languages-filter";

import "../App.css";

export default class Filters extends Component {
  state = {};

  clearAllFilters = () => {};

  clearFilter = () => {};

  render() {
    return (
      <Fragment>
        <FilterItem title="FILTERS" clearFilter={this.clearAllFilters} />
        <Divider className="styled-divider" />
        <AvailabilityFilter />
        <JobTypeFilter />
        <PayRateFilter />
        {/* <ExperienceFilter />
        <CountriesFilter />
        <LanguagesFilter /> */}
      </Fragment>
    );
  }
}
