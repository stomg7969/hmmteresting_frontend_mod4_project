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
    const user_token = localStorage.getItem("user_token");
    const company_token = localStorage.getItem("company_token");

    if (user_token) {
      fetch("http://localhost:3000/api/v1/get_user", {
        headers: {
          authorization: `${user_token}`
        }
      })
        .then(resp => resp.json())
        .then(user => this.setState({ user }))
        .catch(() => console.log("ERROR"));
    } else if (company_token) {
      fetch("http://localhost:3000/api/v1/get_company", {
        headers: {
          authorization: `${company_token}`
        }
      })
        .then(resp => resp.json())
        .then(company => this.setState({ company }))
        .catch(() => console.log("ERROR"));
    }
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
        if (data.error) {
          alert("Incorrect Information");
          this.props.history.push("/user/signup");
        } else {
          localStorage.setItem("user_token", data.token);
          this.setState({ user: data.user }, () =>
            this.props.history.push("/user")
          );
        }
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
          localStorage.setItem("user_token", data.jwt);
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
  handleUserLogoutClick = () => {
    localStorage.removeItem("user_token");
    this.setState({ user: {} }, () => console.log("logged out"));
    this.props.history.push("/");
  };

  //============= EDIT USER PROFILE ===============//
  submitHandler = (userInfo, id) => {
    let token = localStorage.getItem("user_token");

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

  //============= HANDLES COMPANY LOGIN ===============//
  handleCompanyLogin = company => {
    fetch("http://localhost:3000/api/v1/login_company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({
        company: {
          name: company.name,
          password: company.password
        }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
          this.props.history.push("/company/login");
        } else {
          localStorage.setItem("company_token", data.jwt);
          this.setState({ company: data.company }, () => {
            this.props.history.push("/company");
          });
        }
      });
  };

  //============= HANDLES COMPANY SIGNUP ===============//
  handleCompanySignUp = input => {
    fetch("http://localhost:3000/api/v1/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({
        company: {
          name: input.name,
          catch_phrase: input.catch_phrase,
          logo: input.logo,
          password: input.password
        }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          alert("Incorrect Information");
          this.props.history.push("/company/signup");
        } else {
          localStorage.setItem("company_token", data.token);
          this.setState({ company: data.company }, () =>
            this.props.history.push("/company")
          );
        }
      });
  };

  //============= HANDLES COMPANY LOGOUT ===============//
  handleCompanyLogoutClick = () => {
    localStorage.removeItem("company_token");
    this.setState({ company: {} }, () => console.log("logged out"));
    this.props.history.push("/");
  };

  //============= HANDLES COMPANY EDIT ===============//
  // handleCompanyEditClick = (companyInfo, id) => {
  //   let token = localStorage.getItem("company_token");
  //
  //   fetch(`http://localhost:3000/api/v1/company/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `${token}`
  //     },
  //     body: JSON.stringify({
  //       username: companyInfo.name,
  //       catch_phrase: companyInfo.catch_phrase,
  //       logo: companyInfo.logo
  //     })
  //   });
  // };

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
          <Route
            path="/company/login"
            render={() => (
              <CompanyLogin handleCompanyLogin={this.handleCompanyLogin} />
            )}
          />
          <Route
            path="/company/signup"
            render={() => (
              <CompanySignUp handleCompanySignUp={this.handleCompanySignUp} />
            )}
          />
          <Route
            path="/user"
            render={() => (
              <UserContainer
                user={this.state.user}
                handleUserLogoutClick={this.handleUserLogoutClick}
                submitHandler={this.submitHandler}
              />
            )}
          />
          <Route
            path="/company"
            render={() => (
              <CompanyContainer
                handleCompanyLogoutClick={this.handleCompanyLogoutClick}
                company={this.state.company}
              />
            )}
          />
          <Route
            path="/"
            render={() => (
              <div>
                <div>
                  <h1>HMMMTERESTING</h1>
                  <h3>A place to test & support ideas</h3>
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
        <marquee>
          <h4>Welcome to Matt's & Nate's Site 😬</h4>
          <img
            src="https://scontent-frx5-1.cdninstagram.com/vp/404075a9dd68aba5d884168d174e0517/5D035AE7/t51.2885-15/e35/52106110_1173971312766966_8714462964203933292_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&se=7&ig_cache_key=MTk4OTAwMDczMDQ0MjQzMDg5NQ%3D%3D.2"
            alt=""
            id="potter"
          />
        </marquee>
      </div>
    );
  }
}

export default withRouter(Landing);

// WHATS LEFT? priority 1 - 5
// COMPANY EDIT 4
// COMPANY DELETE 3
// CREATE NEW PRODUCT 5
// INTERESTED BUTTON 5
// STYLE 3
