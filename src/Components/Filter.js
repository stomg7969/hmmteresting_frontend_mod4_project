import React from "react";

class Filter extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <label for="search">Search</label>
        <input type="text" name="search" value="" />
        <br />
        <label for="catgory">Category</label>
        <input type="checkbox" name="category" value="" />
        <br />
        <label>Sort By</label>
        <br />
        <label>Name</label>
        <input type="radio" />
        <label>Interest</label>
        <h5>Ascending</h5>
        <input type="radio" />
        <h5>Descending</h5>
        <input type="radio" />
      </div>
    );
  }
}

export default Filter;
