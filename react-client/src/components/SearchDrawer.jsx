import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import SearchList from './SearchList';
import SearchForm from './SearchForm';

class SearchDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'hey',
      searchResults: [],
      searchLoading: false,
    };
    this.enterSearch = this.enterSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  enterSearch(event) {
    this.setState({ query: event.target.value });
  }

  submitSearch() {
    this.setState({ searchLoading: true });
    axios.get('/search', {
      params: {
        terms: this.state.query,
      },
    })
      .then((results) => {
        this.setState({ searchResults: results.data, searchLoading: false });
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
        {this.state.searchLoading ?
          <RefreshIndicator
            size={60}
            style={{ position: 'relative' }}
            left={170}
            top={60}
            status="loading"
          />
        :
          <SearchList
            searchResults={this.state.searchResults}
            userID={this.props.userID}
            refreshUserShows={this.props.refreshUserShows}
          />
        }
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
