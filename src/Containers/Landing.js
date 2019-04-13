import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import UserContainer from "./UserContainer";
import CompanyContainer from "./CompanyContainer";

class Landing extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/"
            render={() => (
              <div>
                <div>
                  <label for="">User</label>
                  <Link to="/user">
                    <button>Login</button>
                    <button>Signup</button>
                  </Link>
                </div>
                <div>
                  <label for="">Company</label>
                  <Link to="/company">
                    <button>Login</button>
                    <button>Signup</button>
                  </Link>
                </div>
              </div>
            )}
          />
          {/* the buttons will lead to login/signup components */}
          <Route path="/user" component={UserContainer} />
          <Route path="/company" component={CompanyContainer} />
        </Switch>
      </div>
    );
  }
}

export default Landing;
