import React, { Component } from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import Landing from "./containers/Landing/Landing";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import Navbar from "./components/Navigation/Navbar/Navbar";
import * as actions from "./store/actions/index";

const asyncMonsters = asyncComponent(() => {
  return import("./containers/Monsters/Monsters");
})

const asyncBuilder = asyncComponent(() => {
  return import("./containers/Builder/Builder");
})

class App extends Component {
  
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  
  render() {
    
    let routes = (
        <Switch>
          <Route path="/" exact component={Landing}/>
          <Route path="/builder" component={asyncBuilder}/>
          <Route path="/auth" component={Auth}/>
          <Redirect to="/"/>
        </Switch>
      );
    
    if (this.props.isAuthenticated) {
      routes = (
          <Switch>
            <Route path="/" exact component={Landing}/>
            <Route path="/builder" component={asyncBuilder}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/monsters" component={asyncMonsters}/>
            <Route path="/auth" component={Auth}/>
            <Redirect to="/"/>
          </Switch>
        );
    }
    
    return (
      <div className="app">
        <Navbar
          isAuth={this.props.isAuthenticated}
        />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !==null
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
