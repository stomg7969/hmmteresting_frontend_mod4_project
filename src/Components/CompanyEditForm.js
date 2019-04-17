import React from "react";
import { withRouter } from "react-router-dom";

class CompanyEditForm extends React.Component {
  state = {
    name: this.props.company.name,
    catch_phrase: this.props.company.catch_phrase,
    logo: this.props.company.logo
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.submitHandler(this.state, this.props.company.id);
    this.props.editFormClickHandler();
  };
  // how can we change password?
  // usually, username can't be changed, but for project, yes.
  render() {
    const { company } = this.props;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label>Company name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.changeHandler}
          />
          <br />
          <label>Slogan</label>
          <input
            type="text"
            name="catch_phrase"
            value={this.state.catch_phrase}
            onChange={this.changeHandler}
          />
          <br />
          <label>Logo URL</label>
          <input
            type="text"
            name="logo"
            value={this.state.logo}
            onChange={this.changeHandler}
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(CompanyEditForm);
