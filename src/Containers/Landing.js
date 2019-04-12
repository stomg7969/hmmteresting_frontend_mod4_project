import React from "react";
import UserContainer from "./UserContainer";
import CompanyContainer from "./CompanyContainer";

class Landing extends React.Component {
  render() {
    return (
      <div>
        <UserContainer />
        <CompanyContainer />
      </div>
    );
  }
}

export default Landing;
