import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import ProductContainer from "./ProductContainer";
import UserAccount from "../Components/UserAccount";
import NavBar from "../Components/NavBar";

class UserContainer extends React.Component {
  state = {
    products: [],
    clicked: false
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    console.log("THE TOKEN", token);
    if (token) {
      fetch("http://localhost:3000/products", {
        headers: {
          authorization: `${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => this.setState({ products: data }));
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

  //============= CLICK HANDLERS ===============//
  handleProfileClick = () => {
    console.log("clicked");
    this.setState({ clicked: true });
  };

  render() {
    return (
      <div>
        <NavBar
          user={this.props.user.username ? this.props.user : ""}
          handleLogoutClick={this.props.handleLogoutClick}
          handleProfileClick={this.handleProfileClick}
        />
        <Switch>
          <Route
            path="/user/account"
            render={() => <UserAccount user={this.props.user} />}
          />
        </Switch>
        {this.state.clicked ? null : (
          <ProductContainer products={this.state.products} />
        )}
        <p>
          {/* localStorage.getItem("token")
            ? this.fetchProducts()
            : "token does not exist" */}
        </p>
        {/* <UserAccount submitHandler={this.submitHandler} /> we need router & fetch get request & pass down props for this */}
      </div>
    );
  }
}

export default withRouter(UserContainer);
