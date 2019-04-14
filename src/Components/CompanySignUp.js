import React from "react";

class CompanySignUp extends React.Component {
  state = {
    name: "",
    catch_phrase: "",
    logo: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Create an Account</h1>
        <form>
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Enter a Username"
          />
          <input
            onChange={this.handleChange}
            type="text"
            name="catch_phrase"
            value={this.state.catch_phrase}
            placeholder="Enter an Email"
          />
          <input
            onChange={this.handleChange}
            type="text"
            name="logo"
            value={this.state.logo}
            placeholder="Enter an Image Url"
          />
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Enter a Password"
          />
          <button onClick={null} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default CompanySignUp;
