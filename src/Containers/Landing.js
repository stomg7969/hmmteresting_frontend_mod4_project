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
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/user/login" component={UserLogin} />
          <Route path="/user/signup" component={UserSignUp} />
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
