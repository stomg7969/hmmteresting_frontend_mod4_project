import React from "react";

class CreateProduct extends React.Component {
  state = {
    name: "",
    category: "",
    description: "",
    img: "",
    quota: 1
  };

  changeListener = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createProductListener = e => {
    e.preventDefault();
    this.props.createProductListener(this.state);
    // this.props.history.push('somewhere')
  };

  render() {
    return (
      <div>
        <form onSubmit={this.createProductListener}>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.changeListener}
          />
          <br />
          <label>Product Category</label>
          <input
            type="text"
            name="category"
            value={this.state.category}
            onChange={this.changeListener}
          />
          <br />
          <label>Describe Product</label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.changeListener}
          />
          <br />
          <label>Product Image</label>
          <input
            type="text"
            name="img"
            value={this.state.img}
            onChange={this.changeListener}
          />
          <br />
          <label>Interest Quota</label>
          <input
            type="number"
            name="quota"
            value={this.state.quota}
            onChange={this.changeListener}
          />
          <br />
          <button>Create Product</button>
        </form>
        <br />
      </div>
    );
  }
}

export default CreateProduct;
