import React, { Component, Fragment } from "react";

import { message, Divider, Row, Col } from "antd";
import Input from "antd/lib/input";

import ConfigData from "../../config-data";
import AvailabilityFilter from "../filters/availability-filter";
import JobTypeFilter from "../filters/job-type-filter";
import PayRateFilter from "../filters/pay-rate-filter";
import FilterItem from "../filters/filter-item";
import ExperienceFilter from "../filters/experience-filter";
import CountriesFilter from "../filters/countries-filter";
import LanguagesFilter from "../filters/languages-filter";
import SkillsFilter from "../filters/skills-filter";
import Jobs from "../job/jobs";

import {
  formatSearchQuery,
  handleOverflow,
  sideEffectApiRequestJobs
} from "./util/helper";

import "./scss/main-container.scss";

const defaultState = {
  availability: { hourly: false, "part-time": false, "full-time": false },
  countries: [],
  experience: "",
  jobType: "",
  languages: [],
  payRate: {
    profilesWithoutPayRate: true,
    minPayValue: ConfigData.payRate.defaultMinPayValue,
    maxPayValue: ConfigData.payRate.defaultMaxPayValue
  },
  searchQuery: [],
  skills: [],
  sortBy: ConfigData.sortOptions[0].value,
  searchResults: []
};

export default class Filters extends Component {
  state = defaultState;

  clearAllFilters = () =>
    this.setState(prevState => ({
      ...defaultState,
      searchResults: prevState.searchResults
    }));

  clearGenericFilter = filterName =>
    this.setState({
      [filterName]: defaultState[filterName]
    });

  // Extracted into own functions to avoid creating anoymous functions upon re-render but reusing the same function

  clearAvailabilityFilter = () => this.clearGenericFilter("availability");

  clearPayRateFilter = () => this.clearGenericFilter("payRate");

  clearCountriesFilter = () => this.clearGenericFilter("countries");

  clearExperienceFilter = () => this.clearGenericFilter("experience");

  clearJobTypeFilter = () => this.clearGenericFilter("jobType");

  clearLanguagesFilter = () => this.clearGenericFilter("languages");

  clearSkillsFilter = () => this.clearGenericFilter("skills");

  toggleCountriesFilter = value => this.toggleGenericFilter("countries", value);

  toggleExperienceFilter = value =>
    this.toggleGenericFilter("experience", value);

  toggleJobTypeFilter = value => this.toggleGenericFilter("jobType", value);

  toggleLanguagesFilter = value => this.toggleGenericFilter("languages", value);

  toggleSkillsFilter = value => this.toggleGenericFilter("skills", value);

  toggleSortByFilter = value => {
    const searchResults = this.state.searchResults.sort(
      (a, b) => a[value] < b[value]
    );
    this.setState({
      sortBy: value,
      searchResults
    });
  };
  toggleGenericFilter = (filterName, value) =>
    this.setState({
      [filterName]: value
    });

  toggleAvailabilityFilter = value => {
    this.setState(prevState => ({
      availability: {
        ...prevState.availability,
        [value]: !prevState.availability[value]
      }
    }));
  };

  togglePayRateSlider = value => {
    const [minPayValue, maxPayValue] = value;
    this.setState({
      payRate: {
        ...this.state.payRate,
        minPayValue,
        maxPayValue
      }
    });
  };

  toggleProfilesWithoutPayRate = () => {
    this.setState(prevState => ({
      payRate: {
        ...this.state.payRate,
        profilesWithoutPayRate: !prevState.payRate.profilesWithoutPayRate
      }
    }));
  };

  minPayValueChange = value => {
    if (handleOverflow(value, "minPayValue")) {
      if (value < this.state.payRate.maxPayValue)
        this.setState({
          payRate: {
            ...this.state.payRate,
            minPayValue: value
          }
        });
      else
        message.error(
          `Please enter a value less than ${this.state.payRate.maxPayValue}`
        );
    } else {
      message.error(
        `Please enter a value between ${
          ConfigData.payRate.minPayValue
        } and ${ConfigData.payRate.maxPayValue - 1}`
      );
    }
  };

  maxPayValueChange = value => {
    if (handleOverflow(value, "maxPayValue")) {
      if (value > this.state.payRate.minPayValue)
        this.setState({
          payRate: {
            ...this.state.payRate,
            maxPayValue: value
          }
        });
      else
        message.error(
          `Please enter a value greater than ${this.state.payRate.minPayValue}`
        );
    } else {
      message.error(
        `Please enter a value between ${ConfigData.payRate.minPayValue +
          1} and ${ConfigData.payRate.maxPayValue}`
      );
    }
  };

  searchQuery = value =>
    this.setState(
      {
        searchQuery: formatSearchQuery(value)
      },
      async () => {
        try {
          const result = await sideEffectApiRequestJobs(this.state);
          if (result.status >= 400 && result.status <= 500) {
            message.error("Something went wrong. Please try again later. . .");
            return false;
          } else {
            const jsonResult = await result.json();
            return this.renderToJobs(jsonResult);
          }
        } catch (err) {
          message.error("Something went wrong. Please try again!");
        }
      }
    );

  renderToJobs = searchResults =>
    this.setState({
      searchResults
    });

  render() {
    return (
      <Fragment>
        <Row className="row-margin">
          <Col span={24}>
            <Input.Search
              className="search-text-shadow"
              placeholder="Search by keywords (Node.js, React, PHP, etc..) as comma separated values"
              enterButton="Search"
              size="large"
              onSearch={this.searchQuery}
            />
          </Col>
        </Row>
        <Row gutter={32} className="row-margin">
          <Col span={6}>
            <FilterItem title="FILTERS" clearFilter={this.clearAllFilters} />
            <Divider className="styled-divider" />
            <SkillsFilter
              localState={this.state.skills}
              title="Skills"
              data={ConfigData.skills}
              clearSkillsFilter={this.clearSkillsFilter}
              toggleSkillsFilter={this.toggleSkillsFilter}
            />
            <AvailabilityFilter
              localState={this.state.availability}
              title="Availability"
              data={ConfigData.availability}
              clearAvailabilityFilter={this.clearAvailabilityFilter}
              toggleAvailabilityFilter={this.toggleAvailabilityFilter}
            />
            <JobTypeFilter
              localState={this.state.jobType}
              title="Job Type"
              data={ConfigData.jobType}
              clearJobTypeFilter={this.clearJobTypeFilter}
              toggleJobTypeFilter={this.toggleJobTypeFilter}
            />
            <PayRateFilter
              localState={this.state.payRate}
              title="Pay Rate/hr ($)"
              data={ConfigData.payRate}
              clearPayRateFilter={this.clearPayRateFilter}
              minPayValueChange={this.minPayValueChange}
              maxPayValueChange={this.maxPayValueChange}
              togglePayRateSlider={this.togglePayRateSlider}
              toggleProfilesWithoutPayRate={this.toggleProfilesWithoutPayRate}
            />
            <ExperienceFilter
              localState={this.state.experience}
              title="Experience level"
              data={ConfigData.experienceLevels}
              clearExperienceFilter={this.clearExperienceFilter}
              toggleExperienceFilter={this.toggleExperienceFilter}
            />
            <CountriesFilter
              localState={this.state.countries}
              title="Countries"
              data={ConfigData.countries}
              clearCountriesFilter={this.clearCountriesFilter}
              toggleCountriesFilter={this.toggleCountriesFilter}
            />
            <LanguagesFilter
              localState={this.state.languages}
              title="Languages"
              data={ConfigData.languages}
              clearLanguagesFilter={this.clearLanguagesFilter}
              toggleLanguagesFilter={this.toggleLanguagesFilter}
            />
          </Col>
          <Col span={12}>
            <Jobs
              results={this.state.searchResults}
              data={ConfigData.sortOptions}
              toggleSortByFilter={this.toggleSortByFilter}
            />
          </Col>
          <Col span={6} />
        </Row>
      </Fragment>
    );
  }
}
