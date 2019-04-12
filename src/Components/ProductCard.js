import React from "react";

class ProductCard extends React.Component {
  render() {
    const {
      category,
      name,
      description,
      img,
      quota,
      company
    } = this.props.product;
    return (
      <div>
        <img onClick={null} src={company.logo} alt="" />
        <h5>{name}</h5>
        <img src={img} alt="" />
        <h5>0/{quota}</h5>
      </div>
    );
  }
}

export default ProductCard;
