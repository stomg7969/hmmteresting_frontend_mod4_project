import React from "react";
import { Route, Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <span>Landing Page</span>
        </Link>
      </div>
    );
  }
}

export default NavBar;
