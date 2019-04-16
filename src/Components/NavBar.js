import React from "react";
import { Route, Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <span> |Landing Page| </span>
        </Link>
        <Link to="/user">
          <span> |Product List| </span>
        </Link>
        <Link to="/user/account">
          <span> |Profile| </span>
        </Link>
        <p>Hi, {this.props.user.username}!</p>
        <button onClick={this.props.handleLogoutClick}>LogOut</button>
      </div>
    );
  }
}

export default NavBar;
