const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

const {
  filterArray,
  filterWithKeyword,
  filterAvailability,
  filterPayRate,
  filterQuery,
  specificSort
} = require("./utils");
const jobsArray = require("./jobs.json");

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
    state.jobType,
    "jobType",
    filteredExperience
  );

  const availabilityFilter = filterAvailability(
    state.availability,
    filteredJobType
  );

  const payRateFilter = filterPayRate(state.payRate, availabilityFilter);

  const queryFilter = filterQuery(
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
