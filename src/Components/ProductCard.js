import React from "react";
import ProductShowCard from "./ProductShowCard";

class ProductCard extends React.Component {
  // this state is temporary until we start working with the router
  // for clicking on image to render showpage.
  state = {
    clicked: false
  };

  clickHandler = () => {
    this.setState({ clicked: !this.state.clicked });
  };

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
        <h5>{name}</h5>
        <img onClick={this.clickHandler} src={img} alt="" />
        <h5>👀 0/{quota}</h5>
        {this.state.clicked ? (
          <ProductShowCard product={this.props.product} />
        ) : null}
      </div>
    );
  }
}

export default ProductCard;
