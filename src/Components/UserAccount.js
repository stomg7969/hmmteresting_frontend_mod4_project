import React from "react";
import UserEditForm from "./UserEditForm";

class UserAccount extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Hello {this.props.user.username}, here are your account details.
        </h1>
        <img src={this.props.user.img} alt="user avatar" />
        <h3>{this.props.user.email}</h3>
        <button onClick={""}>Edit Account</button>
        {/* <UserEditForm /> render edit form when edit button clicked */}
        {/* log out will redirect */}
      </div>
    );
  }
}

export default UserAccount;
