import React from "react";
import { Link } from "react-router-dom";

class UserSignUp extends React.Component {
  state = {
    username: "",
    email: "",
    img: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUserSignUp = e => {
    e.preventDefault();
    this.props.handleUserSignUp(this.state);
    this.setState({ username: "", email: "", img: "", password: "" });
  };

  render() {
    return (
      <div>
        <h1>Create an Account</h1>
        <form>
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            value={this.state.username}
            placeholder="Enter a Username"
          />
          <input
            onChange={this.handleChange}
            type="text"
            name="email"
            value={this.state.email}
            placeholder="Enter an Email"
          />
          <input
            onChange={this.handleChange}
            type="text"
            name="img"
            value={this.state.img}
            placeholder="Enter an Image Url"
          />
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Enter a Password"
          />
          <button onClick={this.handleUserSignUp} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default UserSignUp;
