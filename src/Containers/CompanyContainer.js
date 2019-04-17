import React from "react";
import ProductContainer from "./ProductContainer";
import ProductCard from "../Components/ProductCard";
import CompanyAccount from "../Components/CompanyAccount";
import Filter from "../Components/Filter";

class CompanyContainer extends React.Component {
  state = {
    company: "",
    companyProducts: []
  };

  render() {
    const products = [];
    if (this.props.company.products !== undefined) {
      this.props.company.products.forEach(productObj => {
        return products.push(
          <ProductCard key={productObj.id} product={productObj} />
        );
      });
    }

    return (
      <div>
        <h1>MY PRODUCTS:</h1>
        {products}
        <Filter />
        <CompanyAccount company={this.props.company} />
      </div>
    );
  }
}

// <ProductContainer products={this.state.companyProducts} />
export default CompanyContainer;
