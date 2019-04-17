import React from "react";

class FilterSearchSort extends React.Component {
  state = {
    alphabetSort: false,
    interestSort: false
  };

  clickAlphabetListener = () => {
    this.setState(
      {
        alphabetSort: !this.state.alphabetSort,
        interestSort: false
      },
      () => this.props.sortByGiven("letter")
    );
  };
  // alphabet sort should work, but can't confirm that interest(quota) sorting will work. need test.
  clickInterestListener = () => {
    this.setState(
      {
        interestSort: !this.state.interestSort,
        alphabetSort: false
      },
      () => this.props.sortByGiven("interest")
    );
  };

  render() {
    return (
      <div>
        <div>
          <strong>Search</strong>
          <input type="text" onChange={e => this.props.searchTermHandler(e)} />
        </div>
        <div>
          <strong>Sort by:</strong>
          <label>
            <input
              type="radio"
              value="Alphabetically"
              checked={this.state.alphabetSort}
              onChange={this.clickAlphabetListener}
            />
            Alphabetically
          </label>
          <label>
            <input
              type="radio"
              value="Interest"
              checked={this.state.interestSort}
              onChange={this.clickInterestListener}
            />
            Interest
          </label>
        </div>
        <br />
        <div>
          <label>
            <strong>Filter:</strong>
            <select onChange={e => this.props.filterListener(e)}>
              <option value="">All</option>
              <option value="Technology">Tech</option>
              <option value="Toys">Toys</option>
              <option value="Music Instrument">Intruments</option>
              <option value="Clothing">Clothing</option>
              <option value="Furniture">Furnitures</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

export default FilterSearchSort;
