/* jshint esversion: 6 */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import SearchList from './SearchList';
import SearchForm from './SearchForm';

class SearchDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'hey',
      searchResults: [],
    };
    this.enterSearch = this.enterSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  enterSearch(event) {
    this.setState({ query: event.target.value });
  }

  submitSearch() {
    axios.get('/search', {
      params: {
        terms: this.state.query,
      },
    })
      .then((results) => {
        this.setState({ searchResults: results.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Drawer
        docked={false}
        width={400}
        open={this.props.open}
        onRequestChange={this.props.close}
      >
        <SearchForm
          query={this.query}
          enterSearch={this.enterSearch}
          submitSearch={this.submitSearch}
        />
        <SearchList
          searchResults={this.state.searchResults}
          userID={this.props.userID}
          refreshUserShows={this.props.refreshUserShows}
        />
      </Drawer>
    );
  }
}

SearchDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  userID: PropTypes.number.isRequired,
  refreshUserShows: PropTypes.func.isRequired,
};

export default SearchDrawer;
