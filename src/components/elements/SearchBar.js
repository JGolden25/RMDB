import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import {
  StyledSearchBar,
  StyledSearchBarContent,
} from '../styles/StyledSearchBar';

class SearchBar extends Component {
  state = { inputValue: '' };

  timeOut = null;

  doSearch = event => {
    const { callback } = this.props;
    const { value } = event.target;

    this.setState({ inputValue: value });
    clearTimeout(this.timeOut);

    this.timeOut = setTimeout(() => {
      const { inputValue } = this.state;
      callback(inputValue);
    }, 500);
  };

  render() {
    const { inputValue } = this.state;

    return (
      <StyledSearchBar>
        <StyledSearchBarContent>
          <FontAwesome className="fa-search" name="search" size="2x" />
          <input
            type="text"
            placeholder="Search Movie"
            onChange={this.doSearch}
            value={inputValue}
          />
        </StyledSearchBarContent>
      </StyledSearchBar>
    );
  }
}

SearchBar.propTypes = {
  callback: PropTypes.func,
};

export default SearchBar;
