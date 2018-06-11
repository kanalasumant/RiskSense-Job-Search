import React, { Component, Fragment } from "react";

import { message, Divider } from "antd";

import ConfigData from "../config-data";
import AvailabilityFilter from "./availability-filter";
import JobTypeFilter from "./job-type-filter";
import PayRateFilter from "./pay-rate-filter";
import FilterItem from "./filter-item";
import ExperienceFilter from "./experience-filter";
import CountriesFilter from "./countries-filter";
import LanguagesFilter from "./languages-filter";
import SkillsFilter from "./skills-filter";

import "../App.scss";

const handleOverflow = (value, element) => {
  return element === "minPayValue"
    ? value >= ConfigData.payRate.minPayValue &&
        value <= ConfigData.payRate.maxPayValue - 1
    : value >= ConfigData.payRate.minPayValue + 1 &&
        value <= ConfigData.payRate.maxPayValue;
};

export default class Filters extends Component {
  state = {
    availability: { hourly: false, partTime: false, fullTime: false },
    payRate: {
      profilesWithoutPayRate: true,
      minPayValue: ConfigData.payRate.defaultMinPayValue,
      maxPayValue: ConfigData.payRate.defaultMaxPayValue
    }
  };

  clearAllFilters = () => {};

  clearFilter = () => {};

  toggleAvailabilityFilter = value => {
    this.setState(prevState => ({
      availability: {
        ...prevState.availability,
        [value]: !prevState.availability[value]
      }
    }));
  };

  toggleCountriesFilter = value => {
    this.setState({ countries: value });
  };

  toggleExperienceFilter = value => {
    this.setState({ experience: value });
  };

  toggleJobTypeFilter = value => {
    this.setState({ jobType: value });
  };

  toggleLanguagesFilter = value => {
    this.setState({ languages: value });
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

  toggleSkillsFilter = value => {
    this.setState({ skills: value });
  };

  render() {
    return (
      <Fragment>
        <FilterItem title="FILTERS" clearFilter={this.clearAllFilters} />
        <Divider className="styled-divider" />
        <SkillsFilter
          title="Skills"
          data={ConfigData.skills}
          toggleSkillsFilter={this.toggleSkillsFilter}
        />
        <AvailabilityFilter
          localState={this.state.availability}
          title="Availability"
          data={ConfigData.availability}
          toggleAvailabilityFilter={this.toggleAvailabilityFilter}
        />
        <JobTypeFilter
          title="Job Type"
          data={ConfigData.jobType}
          toggleJobTypeFilter={this.toggleJobTypeFilter}
        />
        <PayRateFilter
          localState={this.state.payRate}
          title="Pay Rate/hr ($)"
          data={ConfigData.payRate}
          toggleExperienceFilter={this.toggleExperienceFilter}
          minPayValueChange={this.minPayValueChange}
          maxPayValueChange={this.maxPayValueChange}
          togglePayRateSlider={this.togglePayRateSlider}
          toggleProfilesWithoutPayRate={this.toggleProfilesWithoutPayRate}
        />
        <ExperienceFilter
          title="Experience level"
          data={ConfigData.experienceLevels}
          toggleExperienceFilter={this.toggleExperienceFilter}
        />
        <CountriesFilter
          title="Countries"
          data={ConfigData.countries}
          toggleCountriesFilter={this.toggleCountriesFilter}
        />
        <LanguagesFilter
          title="Languages"
          data={ConfigData.languages}
          toggleLanguagesFilter={this.toggleLanguagesFilter}
        />
      </Fragment>
    );
  }
}
