import React from "react";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import UserContainer from "./UserContainer";
import CompanyContainer from "./CompanyContainer";
import NavBar from "../Components/NavBar";
import UserLogin from "../Components/UserLogin";
import UserSignUp from "../Components/UserSignUp";
import CompanySignUp from "../Components/CompanySignUp";
import CompanyLogin from "../Components/CompanyLogin";
import ProductContainer from "./ProductContainer";

class Landing extends React.Component {
  state = {
    user: {},
    company: {}
  };

  //============= HANDLES USER SIGNUP ===============//
  handleUserSignUp = input => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: input.username,
          email: input.email,
          img: input.img,
          password: input.password
        }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ user: data.user }, () =>
          this.props.history.push("/user")
        );
        localStorage.setItem("token", data.token);
      });
  };

  //============= HANDLES USER LOGIN ===============//
  handleUserLogin = user => {
    fetch("http://localhost:3000/api/v1/login_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password
        }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem("token", data.jwt);
        this.setState({ user: data.user }, () =>
          this.props.history.push("/user")
        );
      });
  };

  //============= HANDLES USER LOGOUT ===============//
  handleLogoutClick = () => {
    localStorage.removeItem("token");
    this.setState({ user: {} }, () => console.log("logged out"));
    this.props.history.push("/");
  };

  //============= LOGIN HELPER METHOD ===============//
  loggedIn = () => this.state.user.username;

  render() {
    // this.loggedIn() ? null : console.log("blach");
    return (
      <div>
        <NavBar handleLogoutClick={this.handleLogoutClick} />
        <Switch>
          <Route
            path="/user/login"
            render={() => <UserLogin handleUserLogin={this.handleUserLogin} />}
          />
          <Route
            path="/user/signup"
            render={() => (
              <UserSignUp handleUserSignUp={this.handleUserSignUp} />
            )}
          />
          <Route path="/company/login" component={CompanyLogin} />
          <Route path="/company/signup" component={CompanySignUp} />
          <Route path="/user" component={UserContainer} />
          <Route path="/company" component={CompanyContainer} />
          <Route
            path="/"
            render={() => (
              <div>
                <div>
                  <p>
                    after signup / login, welcome 'username' should be rendered
                  </p>
                  <label htmlFor="">User</label>
                  <Link to="/user/login">
                    <button>Login</button>
                  </Link>
                  <Link to="/user/signup">
                    <button>Signup</button>
                  </Link>
                </div>
                <div>
                  <label htmlFor="">Company</label>
                  <Link to="/company/login">
                    <button>Login</button>
                  </Link>
                  <Link to="/company/signup">
                    <button>Signup</button>
                  </Link>
                </div>
              </div>
            )}
          />
          {/* the buttons will lead to login/signup components */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(Landing);
