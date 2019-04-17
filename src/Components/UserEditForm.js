import React from "react";
import { withRouter } from "react-router-dom";

class UserEditForm extends React.Component {
  state = {
    username: this.props.user.username,
    email: this.props.user.email,
    img: this.props.user.img
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.submitHandler(this.state, this.props.user.id);
    this.props.editFormClickHandler();
  };

  deleteHandler = () => {
    let token = localStorage.getItem("user_token");
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, {
      method: "DELETE",
      headers: {
        authorization: `${token}`
      }
    }).then(() => {
      localStorage.removeItem("user_token");
      this.props.history.push("/");
    });
  };
  // how can we change password?
  // usually, username can't be changed, but for project, yes.
  render() {
    const { user } = this.props;
    console.log("in edit", user.password, this.state, this.props.user.id);
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.changeHandler}
          />
          <br />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.changeHandler}
          />
          <br />
          <label>Image URL</label>
          <input
            type="text"
            name="img"
            value={this.state.img}
            onChange={this.changeHandler}
          />
          <br />
          <button>Edit</button>
        </form>
        <button onClick={this.deleteHandler}>Delete</button>
      </div>
    );
  }
}

export default withRouter(UserEditForm);
