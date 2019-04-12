import React from "react";
import UserEditForm from "./UserEditForm";

class UserAccount extends React.Component {
  render() {
    return (
      <div>
        <h1>hello</h1>
        {/* in here, i need to show the user's information. get it by props */}
        <button onClick={""}>Edit Account</button>
        {/* <UserEditForm /> render edit form when edit button clicked */}
        <button>Log Out</button>
        {/* log out will redirect */}
      </div>
    );
  }
}

export default UserAccount;
