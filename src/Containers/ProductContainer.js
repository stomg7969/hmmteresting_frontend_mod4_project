import React from "react";
import ProductList from "../Components/ProductList";

class ProductContainer extends React.Component {
  render() {
    return <ProductList products={this.props.products} />;
  }
}

export default ProductContainer;
