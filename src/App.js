import React, { Component } from 'react';
import {Route} from "react-router-dom";

import './App.css';
import Builder from "./containers/Builder/Builder";
import Landing from "./containers/Landing/Landing";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
  render() {
    return (
      <Layout className="App">
        <Route path="/" exact component={Landing}/>
        <Route path="/builder" component={Builder}/>
      </Layout>
    );
  }
}

export default App;
