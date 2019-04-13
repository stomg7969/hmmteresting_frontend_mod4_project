import React, { Component } from "react";
import { Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Landing from "./Containers/Landing";

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Landing} />
      </div>
    );
  }
}

export default App;

// need to work on edits for both company and user,
// need to make the fetch work for an individual user
