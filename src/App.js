import React, { Component } from 'react';
import {Route} from "react-router-dom";

import Builder from "./containers/Builder/Builder";
import Landing from "./containers/Landing/Landing";
import Navbar from "./components/Navigation/Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar/>
        <Route path="/" exact component={Landing}/>
        <Route path="/builder" component={Builder}/>
      </div>
    );
  }
}

export default App;
