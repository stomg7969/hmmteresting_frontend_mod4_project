import React from "react";
import ProductContainer from "./ProductContainer";
// import UserAccount from "../Containers/UserAccount";

class UserContainer extends React.Component {
  state = {
    products: [],
    users: []
  };

  componentDidMount() {
    // need to be a specific user, not users
    fetch("http://localhost:3000/users")
      .then(r => r.json())
      .then(users => this.setState({ users }));

    fetch("http://localhost:3000/products")
      .then(r => r.json())
      .then(products => this.setState({ products }));
  }

  render() {
    return (
      <div>
        <ProductContainer products={this.state.products} />
        {/* <UserAccount submitHandler={this.submitHandler} /> we need router & fetch get request & pass down props for this */}
      </div>
    );
  }
}

export default UserContainer;
