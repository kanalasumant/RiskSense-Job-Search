const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const app = express();

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, "client/build")));

const jobsArray = require("./jobs.json");

// utility functions
const filterArray = (genericArray, value, jobsArray) => {
  console.log(genericArray);
  return genericArray.length === 0
    ? jobsArray
    : jobsArray.filter(job => genericArray.indexOf(job[value]) !== -1);
};

const filterWithKeyword = (keyword, value, jobsArray) =>
  keyword === "JOB_LEVEL_UNSPECIFIED" ||
  keyword === "JOB_CATEGORY_UNSPECIFIED" ||
  keyword === ""
    ? jobsArray
    : jobsArray.filter(job => job[value] === keyword);

const filterAvailability = (value, jobsArray) =>
  Object.values(value).some(t => t)
    ? jobsArray.filter(job => value[job.availability])
    : jobsArray;

const filterPayRate = (
  { profilesWithoutPayRate, minPayValue: min, maxPayValue: max },
  jobsArray
) => {
  const jobsWithPayRate = jobsArray.filter(
    ({ payRate: pR }) => min <= pR && max >= pR
  );
  const jobsWithoutPayRate = jobsArray.filter(({ payRate: pR }) => !pR);
  return profilesWithoutPayRate
    ? jobsWithPayRate.concat(jobsWithoutPayRate)
    : jobsWithPayRate;
};

const filterQuery = (queryArray, jobsArray) => {
  const combinedArray = [].concat(...queryArray);
  return combinedArray.length === 0
    ? jobsArray
    : jobsArray.filter(job =>
        combinedArray.some(queryTerm => {
          const regex = new RegExp(queryTerm, "gi");
          const { title, description } = job.role;
          return regex.test(title) || regex.test(description);
        })
      );
};

const specificSort = (sortBy, jobsArray) =>
  jobsArray.sort((a, b) => a[sortBy] < b[sortBy]);

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
