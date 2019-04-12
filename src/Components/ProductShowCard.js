import React from "react";

class ProductShowCard extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div>
        <h3>{product.company.name}</h3>
        <img src={product.company.logo} alt="" />
        <h4>{product.company.catch_phrase}</h4>
        <p>{product.description}</p>
      </div>
    );
  }
}

export default ProductShowCard;
