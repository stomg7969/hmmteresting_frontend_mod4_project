import React from "react";
import ProductContainer from "./ProductContainer";

// const URLS = "http://localhost:3001/";

class CompanyContainer extends React.Component {
  state = {
    companyProducts: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/companies/1/products")
      .then(resp => resp.json())
      .then(companyProducts => this.setState({ companyProducts }));
  }

  render() {
    return (
      <div>
        <h1>MY PRODUCTS:</h1>
        <ProductContainer products={this.state.companyProducts} />
      </div>
    );
  }
}

export default CompanyContainer;
