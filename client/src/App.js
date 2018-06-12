import React, { Component } from "react";

import MainContainer from "./components/main-container";

import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Custom Job Search</h1>
        </header>
        <MainContainer />
      </div>
    );
  }
}

export default App;
