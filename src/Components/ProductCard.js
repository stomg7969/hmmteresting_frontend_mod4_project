import React from "react";
import ProductShowCard from "./ProductShowCard";

class ProductCard extends React.Component {
  // this state is temporary until we start working with the router
  // for clicking on image to render showpage.
  state = {
    clicked: false,
    interestClicked: false,
    lastInterestId: 0
  };

  clickHandler = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  interestUpdate = data => {
    this.props.interestUpdate();
    this.setState({ lastInterestId: data.id });
  };

  interestHandler = () => {
    this.setState({ interestClicked: !this.state.interestClicked }, () => {
      if (this.state.interestClicked) {
        console.log("when true");
        fetch("http://localhost:3000/interests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: this.props.user.id,
            product_id: this.props.product.id
          })
        })
          .then(r => r.json())
          .then(data => this.interestUpdate(data));
      } else {
        console.log("when false");
        fetch(`http://localhost:3000/interests/${this.state.lastInterestId}`, {
          method: "DELETE"
        })
          .then(r => r.json())
          .then(data => this.interestUpdate(data));
      }
    });
  };

  render() {
    console.log(this.state.interestClicked, this.state.lastInterestId);
    const interests = this.props.product.interests;
    const { product } = this.props;
    return (
      <div>
        <h5>{product.name}</h5>
        <img onClick={this.clickHandler} src={product.img} alt="" />
        <h5>
          <span role="img" aria-label="" onClick={this.interestHandler}>
            👀
          </span>{" "}
          {product.interests.length}/{product.quota}
        </h5>
        {this.state.clicked ? (
          <ProductShowCard product={this.props.product} />
        ) : null}
      </div>
    );
  }
}

export default ProductCard;
