import React from "react";
import UserEditForm from "./UserEditForm";

class UserAccount extends React.Component {
  state = {
    clicked: false
  };

  // componentDidMount() {
  //   console.log("cdm in account");
  //   this.setState({ clicked: false });
  // }
  //============= BUTTON RENDERS ACCOUNT/EDIT ACCOUNT ===============//
  editFormClickHandler = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        {this.state.clicked ? (
          <UserEditForm
            user={user}
            submitHandler={this.props.submitHandler}
            editFormClickHandler={this.editFormClickHandler}
          />
        ) : (
          <div>
            <h2>Hello {user.username}, here are your account details.</h2>
            <img src={user.img} alt="user avatar" />
            <h3>{user.email}</h3>{" "}
          </div>
        )}
        {this.state.clicked ? (
          <button onClick={this.editFormClickHandler}>Back to Account</button>
        ) : (
          <button onClick={this.editFormClickHandler}>Edit Account</button>
        )}
      </div>
    );
  }
}

export default UserAccount;
