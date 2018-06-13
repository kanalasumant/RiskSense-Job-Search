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

module.exports = {
  filterArray,
  filterWithKeyword,
  filterAvailability,
  filterPayRate,
  filterQuery,
  specificSort
};
