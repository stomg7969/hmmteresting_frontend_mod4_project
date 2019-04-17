import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import ProductContainer from "./ProductContainer";
import UserAccount from "../Components/UserAccount";
import FilterSearchSort from "../Components/FilterSearchSort";
import NavBar from "../Components/NavBar";

class UserContainer extends React.Component {
  state = {
    products: [],
    clicked: false,
    searchTerm: "",
    filterTerm: ""
  };

  componentDidMount() {
    let token = localStorage.getItem("user_token");
    console.log("THE TOKEN", token);
    if (token) {
      fetch("http://localhost:3000/products", {
        headers: {
          authorization: `${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => this.setState({ products: data, clicked: true }));
    } else {
      alert("log in.");
      this.props.history.push("/");
    }
  }

  // fetchProducts() {
  //   let token = localStorage.getItem("token");
  //   console.log("THE TOKEN", token);
  //
  //   fetch("http://localhost:3000/products", {
  //     headers: {
  //       authorization: `${token}`
  //     }
  //   })
  //     .then(resp => resp.json())
  //     .then(data => console.log(data));
  // }

  //============= FILTER SEARCH SORT HANDLERS ===============//
  searchTermHandler = e => {
    this.setState({ searchTerm: e.target.value });
  };

  searchByTerm = () => {
    console.log("searchByTerm", this.state.searchTerm);
    let filteredProducts = this.state.products.filter(product =>
      product.category.includes(this.state.filterTerm)
    );
    return filteredProducts.filter(product =>
      product.name.toLowerCase().includes(this.state.searchTerm)
    );
  };

  filterListener = e => {
    this.setState({ filterTerm: e.target.value });
  };

  sortByGiven = string => {
    if (string === "letter") {
      const sortedProducts = this.state.products.sort((x, y) => {
        return x.name.toLowerCase().localeCompare(y.name.toLowerCase());
      });
      this.setState({ products: sortedProducts });
    } else if (string === "interest") {
      const sortedProducts = this.state.products.sort((x, y) => {
        return x.interest - y.interest;
      });
      this.setState({ products: sortedProducts });
    }
  };

  //============= CLICK HANDLERS ===============//

  render() {
    return (
      <div>
        <NavBar
          user={this.props.user.username ? this.props.user : ""}
          handleUserLogoutClick={this.props.handleUserLogoutClick}
        />
        <FilterSearchSort
          searchTermHandler={this.searchTermHandler}
          filterListener={this.filterListener}
          sortByGiven={this.sortByGiven}
        />
        <Switch>
          <Route
            path="/user/account"
            render={() => (
              <UserAccount
                user={this.props.user}
                submitHandler={this.props.submitHandler}
              />
            )}
          />
          <Route
            path="/user"
            render={() => <ProductContainer products={this.searchByTerm()} />}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(UserContainer);
