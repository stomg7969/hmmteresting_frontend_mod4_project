import React from "react";
import ProductList from "../Components/ProductList";
import CompanyAccount from "../Components/CompanyAccount";
import Filter from "../Components/Filter";
import CreateProduct from "../Components/CreateProduct";

class CompanyContainer extends React.Component {
  state = {
    companyProducts: []
  };

  createProductListener = productInfoInput => {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: productInfoInput.name,
        company_id: this.props.company.id,
        quota: productInfoInput.quota,
        completed: false,
        category: productInfoInput.category,
        description: productInfoInput.description,
        img: productInfoInput.img
      })
    })
      .then(r => r.json())
      .then(product =>
        this.setState({
          companyProducts: [product, ...this.state.companyProducts]
        })
      );
  };

  componentDidMount() {
    this.setState({ companyProducts: this.props.company.products });
  }

  // const products = [];
  // this.state.companyProducts.forEach(productObj => {
  //   return products.push(
  //     <ProductList
  //       key={productObj.id}
  //       products={this.props.company.products}
  //     />
  //   );
  // });

  render() {
    console.log("CC", this.state.companyProducts, this.props.company.products);

    return (
      <div>
        <h1>MY PRODUCTS:</h1>
        <CreateProduct createProductListener={this.createProductListener} />
        <ProductList products={this.state.companyProducts} />
        <Filter />
        <CompanyAccount
          handleCompanyLogoutClick={this.props.handleCompanyLogoutClick}
          company={this.props.company}
        />
      </div>
    );
  }
}

// <ProductContainer products={this.state.companyProducts} />
export default CompanyContainer;
