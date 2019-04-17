import React from "react";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import UserContainer from "./UserContainer";
import CompanyContainer from "./CompanyContainer";
import UserLogin from "../Components/UserLogin";
import UserSignUp from "../Components/UserSignUp";
import CompanySignUp from "../Components/CompanySignUp";
import CompanyLogin from "../Components/CompanyLogin";

class Landing extends React.Component {
  state = {
    user: {},
    company: {}
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/v1/get_user", {
      headers: {
        authorization: `${token}`
      }
    })
      .then(resp => resp.json())
      .then(data => this.setState({ user: data.user }));
  }

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
        console.log(data);
        // localStorage.setItem("token", data.token);
        // this.setState({ user: data.user }, () =>
        //   this.props.history.push("/user")
        // );
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
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          this.setState({ user: data.user }, () =>
            this.props.history.push("/user")
          );
        } else {
          this.props.history.push("/");
        }
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
    return (
      <div>
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
          <Route
            path="/user"
            render={() => (
              <UserContainer
                user={this.state.user}
                handleLogoutClick={this.handleLogoutClick}
              />
            )}
          />
          <Route path="/company" component={CompanyContainer} />
          <Route
            path="/"
            render={() => (
              <div>
                <div>
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
        </Switch>
      </div>
    );
  }
}

export default withRouter(Landing);
