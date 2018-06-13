import ConfigData from "../../../config-data";

const formatSearchQuery = value =>
  value === ""
    ? []
    : [].concat(
        ...value
          .trim()
          .split(",")
          .map(item => item.match(/\S+/g))
      );

const handleOverflow = (value, element) => {
  return element === "minPayValue"
    ? value >= ConfigData.payRate.minPayValue &&
        value <= ConfigData.payRate.maxPayValue - 1
    : value >= ConfigData.payRate.minPayValue + 1 &&
        value <= ConfigData.payRate.maxPayValue;
};

const sideEffectApiRequestJobs = async data => {
  try {
    const { searchResults, ...state } = data;
    const result = await fetch("/api/query", {
      method: "POST",
      body: JSON.stringify({
        state
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const resJson = await result.json();
    return resJson;
  } catch (err) {
    console.error(err);
  }
};

export { formatSearchQuery, handleOverflow, sideEffectApiRequestJobs };
