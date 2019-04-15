import React from "react";
import ProductContainer from "./ProductContainer";

class UserContainer extends React.Component {
  state = {
    products: [],
    user: {}
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    console.log("THE TOKEN", token);

    fetch("http://localhost:3000/products", {
      headers: {
        authorization: `${token}`
      }
    })
      .then(resp => resp.json())
      .then(data => console.log(data));
  }

  fetchProducts() {
    let token = localStorage.getItem("token");
    console.log("THE TOKEN", token);

    fetch("http://localhost:3000/products", {
      headers: {
        authorization: `${token}`
      }
    })
      .then(resp => resp.json())
      .then(data => console.log(data));
  }

  render() {
    return (
      <div>
        <ProductContainer products={this.state.products} />
        <p>
          {localStorage.getItem("token")
            ? this.fetchProducts()
            : "token does not exist"}
        </p>
        {/* <UserAccount submitHandler={this.submitHandler} /> we need router & fetch get request & pass down props for this */}
      </div>
    );
  }
}

export default UserContainer;
