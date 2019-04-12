import React from "react";
import ProductCard from "./ProductCard";

class ProductList extends React.Component {
  render() {
    const products = this.props.products.map(product => {
      return <ProductCard key={product.id} product={product} />;
    });
    return <div>{products}</div>;
  }
}

export default ProductList;
