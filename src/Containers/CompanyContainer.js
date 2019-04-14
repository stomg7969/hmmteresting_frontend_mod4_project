import React from "react";
import ProductContainer from "./ProductContainer";
import CompanyAccount from "../Components/CompanyAccount";
import Filter from "../Components/Filter";

class CompanyContainer extends React.Component {
  state = {
    company: "",
    companyProducts: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/companies/1")
      .then(resp => resp.json())
      .then(company => this.setState({ company }));
    fetch("http://localhost:3000/companies/1/products")
      .then(resp => resp.json())
      .then(productsArr =>
        this.setState({
          companyProducts: productsArr
        })
      );
  }

  render() {
    return (
      <div>
        <h1>MY PRODUCTS:</h1>
        <Filter />
        <ProductContainer products={this.state.companyProducts} />
        <CompanyAccount company={this.state.company} />
      </div>
    );
  }
}

export default CompanyContainer;
