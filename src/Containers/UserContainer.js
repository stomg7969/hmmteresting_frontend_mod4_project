import React from "react";
import ProductContainer from "./ProductContainer";

class UserContainer extends React.Component {
  state = {
    products: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/products")
      .then(r => r.json())
      .then(products => this.setState({ products }));
  }

  render() {
    console.log("prducts are: ", this.state.products);
    return <ProductContainer products={this.state.products} />;
  }
}

export default UserContainer;
