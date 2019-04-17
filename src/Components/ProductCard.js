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
    const { product } = this.props;
    return (
      <div>
        <h5>{product.name}</h5>
        <img onClick={this.clickHandler} src={product.img} alt="" />
        <h5>
          <span role="img" aria-label="">
            👀
          </span>{" "}
          0/{product.quota}
        </h5>
        {this.state.clicked ? (
          <ProductShowCard product={this.props.product} />
        ) : null}
      </div>
    );
  }
}

export default ProductCard;
