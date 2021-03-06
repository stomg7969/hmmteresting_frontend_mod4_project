import React from "react";

class CompanyLogin extends React.Component {
  state = {
    name: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCompanyLogin = e => {
    e.preventDefault();
    this.props.handleCompanyLogin(this.state);
    this.setState({ name: "", password: "" });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Enter company name"
          />
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Enter Password"
          />
          <button onClick={this.handleCompanyLogin} type="submit">
            Log In
          </button>
        </form>
      </div>
    );
  }
}

export default CompanyLogin;
