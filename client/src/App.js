import React, { Component } from "react";

import Input from "antd/lib/input";
import { Row, Col } from "antd";

import Filters from "./components/filters";
import Jobs from "./components/jobs";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Custom Job Search</h1>
        </header>
        <Row className="row-margin">
          <Col span={24}>
            <Input.Search
              className="search-text-shadow"
              placeholder="Search by keywords (Node.js, React, PHP, etc..) as comma separated values"
              enterButton="Search"
              size="large"
              onSearch={value => console.log(value)}
            />
          </Col>
        </Row>
        <Row gutter={16} className="row-margin">
          <Col span={6}>
            <Filters />
          </Col>
          <Col span={12}>
            <Jobs />
          </Col>
          <Col span={6} />
        </Row>
      </div>
    );
  }
}

export default App;
