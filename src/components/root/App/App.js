import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import securePage from "../../hoc/securePage";

import Header from "../Header/Header";
import HomePage from "../../pages/HomePage/HomePage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";

import "./App.css";

const a = <h1>adsd</h1>;
class App extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className="App">
        <Header />
        <div className="App__container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/login" component={LoginPage} />

            {/* Secured Pages */}
            <Route
              exact
              path="/dashboard"
              render={() => securePage(isLoggedIn, <DashboardPage />, "/login")}
            />

            {/* Fallback Route */}
            <Route path="/" component={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isLoggedIn: state.user.loggedIn };
};

export default withRouter(connect(mapStateToProps)(App));
