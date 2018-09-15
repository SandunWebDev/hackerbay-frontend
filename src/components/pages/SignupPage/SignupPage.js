import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../../../redux/actions/userActions";

class SignupPage extends Component {
  render() {
    const { user, userActions } = this.props;

    return (
      <div>
        <h1>Signup Page</h1>
        <form name="signup_form">
          <h2>Current User : {user.email}</h2>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Valid Email" />
          <input type="password" name="password" placeholder="Your Password" />
          <input
            type="password"
            name="password_confirm"
            placeholder="Retype Your Password"
          />
          <button
            onClick={e => {
              e.preventDefault();
              userActions.updateEmail("sandunwebdev@gmail.com");
            }}
          >
            Create My Account
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapActionsToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SignupPage);
