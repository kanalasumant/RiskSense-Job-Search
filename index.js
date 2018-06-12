const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const app = express();

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, "client/build")));

const jobsArray = require("./jobs.json");

// utility functions
const filterArray = (genericArray, value, jobsArray) =>
  genericArray.length === 0
    ? jobsArray
    : jobsArray.filter(job => genericArray.indexOf(job[value]) !== -1);

const filterWithKeyword = (keyword, value, jobsArray) =>
  keyword === "JOB_LEVEL_UNSPECIFIED" ||
  keyword === "JOB_CATEGORY_UNSPECIFIED" ||
  keyword === ""
    ? jobsArray
    : jobsArray.filter(job => job[value] === keyword);

const filterPayRate = (payRateObject, jobsArray) =>
  payRateObject.profilesWithoutPayRate
    ? jobsArray
    : jobsArray.filter(
        job =>
          payRateObject.minPayValue <= job.payRate &&
          payRateObject.maxPayValue >= job.payRate
      );

const filterQuery = (queryArray, jobsArray) =>
  [].concat(...queryArray).length === 0
    ? jobsArray
    : jobsArray.filter(job =>
        queryArray.some(
          queryTerm =>
            queryTerm === job.role.title || queryTerm === job.role.description
        )
      );

const specificSort = (sortBy, jobsArray) =>
  jobsArray.sort((a, b) => a[sortBy] > b[sortBy]);

app.post("/api/query", jsonParser, (req, res) => {
  const { state } = req.body;
  const filteredCountries = filterArray(state.countries, "country", jobsArray);
  const filteredLanguages = filterArray(
    state.languages,
    "language",
    filteredCountries
  );
  const filteredExperience = filterWithKeyword(
    state.experience,
    "experience",
    filteredLanguages
  );
  const filteredJobType = filterWithKeyword(
    state.experience,
    "jobType",
    filteredExperience
  );
  const availabilityFilter = filterWithKeyword(
    state.availability,
    "availability",
    filteredJobType
  );
  const payRateFilter = filterPayRate(state.payRate, availabilityFilter);
  const queryFilter = filterPayRate(
    [state.searchQuery, state.skills],
    payRateFilter
  );
  const sortByFilter = specificSort(state.sortBy, queryFilter);

  res.json(sortByFilter);
});

app.get("*", (req, res) => {
  res.json({
    status: "404"
  });
});

const port = process.env.PORT || 5000;
app.listen(port);
