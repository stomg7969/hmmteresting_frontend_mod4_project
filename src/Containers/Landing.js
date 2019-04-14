import React from "react";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import UserContainer from "./UserContainer";
import CompanyContainer from "./CompanyContainer";
import NavBar from "../Components/NavBar";
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
    debugger;
    console.log("app did mount", token);
    fetch("http://localhost:3000/api/v1/get_user", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        authorization: `${token}`
      }
    })
      .then(resp => resp.json())
      .then(data => this.setState({ user: data.user }));
  }

  handleUserSignUp = (e, input) => {
    e.preventDefault();
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
          password_digest: input.password
        }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        // console.log("1", data, "2", data.user, "3", data.token);
        this.setState({ user: data.user });
        localStorage.setItem("token", data.token);
        // what is 'token'? can we name it with something else? (user, company)
      });
  };

  render() {
    console.log("state", this.state.user, "storage", localStorage);
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/user/login" component={UserLogin} />
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
                  <label for="">User</label>
                  <Link to="/user/login">
                    <button>Login</button>
                  </Link>
                  <Link to="/user/signup">
                    <button>Signup</button>
                  </Link>
                </div>
                <div>
                  <label for="">Company</label>
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

export default Landing;
