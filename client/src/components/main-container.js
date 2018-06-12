import React, { Component, Fragment } from "react";

import { message, Divider, Row, Col } from "antd";
import Input from "antd/lib/input";

import ConfigData from "../config-data";
import AvailabilityFilter from "./availability-filter";
import JobTypeFilter from "./job-type-filter";
import PayRateFilter from "./pay-rate-filter";
import FilterItem from "./filter-item";
import ExperienceFilter from "./experience-filter";
import CountriesFilter from "./countries-filter";
import LanguagesFilter from "./languages-filter";
import SkillsFilter from "./skills-filter";
import Jobs from "./jobs";

import "../App.scss";

const handleOverflow = (value, element) => {
  return element === "minPayValue"
    ? value >= ConfigData.payRate.minPayValue &&
        value <= ConfigData.payRate.maxPayValue - 1
    : value >= ConfigData.payRate.minPayValue + 1 &&
        value <= ConfigData.payRate.maxPayValue;
};

const defaultState = {
  availability: "",
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
  sortBy: ConfigData.sortOptions[0]
};

export default class Filters extends Component {
  state = defaultState;

  clearAllFilters = () => this.setState(defaultState);

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

  toggleAvailabilityFilter = value =>
    this.toggleGenericFilter("availability", value);

  toggleCountriesFilter = value => this.toggleGenericFilter("countries", value);

  toggleExperienceFilter = value =>
    this.toggleGenericFilter("experience", value);

  toggleJobTypeFilter = value => this.toggleGenericFilter("jobType", value);

  toggleLanguagesFilter = value => this.toggleGenericFilter("languages", value);

  toggleSkillsFilter = value => this.toggleGenericFilter("skills", value);

  toggleSortByFilter = value => this.toggleGenericFilter("sortBy", value);

  toggleGenericFilter = (filterName, value) =>
    this.setState({
      [filterName]: value
    });

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
        searchQuery: [].concat(
          ...value
            .trim()
            .split(",")
            .map(item => item.match(/\S+/g))
        )
      },
      () => this.sideEffectApiRequestJobs()
    );

  sideEffectApiRequestJobs = async () => {
    const result = await fetch("/api/query", {
      method: "POST",
      body: JSON.stringify({
        state: this.state
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const resJson = await result.json();
    console.log(resJson);
  };

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
