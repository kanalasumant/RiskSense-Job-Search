import React from "react";

import MainContainer from "./components/containers/main-container";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Custom Job Search</h1>
      </header>
      <h3>
        <a
          target="__blank"
          href="https://github.com/kanalasumant/RiskSense-Job-Search/blob/master/README.md"
        >
          Please click here and take a look at the README.md to understand how
          the app works.
        </a>
      </h3>
      <MainContainer />
    </div>
  );
};

export default App;
