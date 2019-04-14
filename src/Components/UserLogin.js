import React from "react";

class UserLogin extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            value={this.state.username}
            placeholder="Enter Username"
          />
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Enter Password"
          />
          <button onClick={null} type="submit">
            Log In
          </button>
        </form>
      </div>
    );
  }
}

export default UserLogin;
