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
    company: {},
    loginError: ""
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
        localStorage.setItem("token", data.token);
        this.setState({ user: data.user }, () =>
          this.props.history.push("/user")
        );
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
      .then(resp => {
        if (!resp.ok) {
          this.setState({ loginError: "Invalid Input" });
        } else {
          return resp.json();
        }
      })
      .then(data => {
        if (this.state.loginError === "") {
          localStorage.setItem("token", data.jwt);
          this.setState({ user: data.user }, () =>
            this.props.history.push("/user")
          );
        } else {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
    // .catch(error => console.error(error));
  };

  //============= HANDLES USER LOGOUT ===============//
  handleLogoutClick = () => {
    localStorage.removeItem("token");
    this.setState({ user: {} }, () => console.log("logged out"));
    this.props.history.push("/");
  };

  //============= LOGIN HELPER METHOD ===============//
  loggedIn = () => this.state.user.username;

  //============= EDIT USER PROFILE ===============//
  submitHandler = (userInfo, id) => {
    console.log("clicked", userInfo);
    let token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`
      },
      body: JSON.stringify({
        username: userInfo.username,
        img: userInfo.img,
        email: userInfo.email
      })
    })
      .then(r => r.json())
      .then(data => this.setState({ user: data }));
  };

  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/user/login"
            render={() => (
              <UserLogin
                handleUserLogin={this.handleUserLogin}
                loginError={
                  this.state.loginError.length > 0
                    ? this.state.loginError
                    : null
                }
              />
            )}
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
                submitHandler={this.submitHandler}
              />
            )}
          />
          <Route path="/company" component={CompanyContainer} />
          <Route
            path="/"
            render={() => (
              <div>
                <div>
                  <h1>Welcome to HMM..TERESTING. Simple design.</h1>
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
