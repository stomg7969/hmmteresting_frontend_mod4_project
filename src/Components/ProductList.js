import React from "react";
import ProductCard from "./ProductCard";

const ProductList = props => {
  if (props.products === undefined) {
    return <h2>Loading...</h2>;
  } else {
    const products = props.products.map(product => {
      return (
        <ProductCard
          key={product.id}
          product={product}
          interestUpdate={props.interestUpdate}
          user={props.user}
        />
      );
    });
    return <div>{products}</div>;
  }
};

export default ProductList;
