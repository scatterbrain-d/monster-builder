import React, { Component } from 'react';
import './App.css';
import Builder from "./containers/Builder";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Builder/>
      </div>
    );
  }
}

export default App;
