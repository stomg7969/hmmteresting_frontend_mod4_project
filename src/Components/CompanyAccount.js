import React from "react";

class CompanyAccount extends React.Component {
  render() {
    return (
      <div>
        <h1>Your Account Information:</h1>
        <img src={this.props.company.logo} />
        <h1>{this.props.company.name}</h1>
        <p>{this.props.company.catch_phrase}</p>
        <button>Edit Your Account</button>
        <button>Log Out</button>
      </div>
    );
  }
}

export default CompanyAccount;
