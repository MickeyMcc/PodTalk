import React from 'react';
import SearchEntry from './SearchEntry.jsx';

import {
  addShow,
  search,
  reset,
} from './actions';

class SearchList extends React.Compoennt {


  render() {
    return (
      <div className='search-area pane' >
        <form id='searchbar' >
          <input type='text' />
          <input className='button' type='submit' />
        </form>
        <h4> Search Results </h4>
        {props.results.length} results found.
        {props.results.map((result, index) =>
          <SearchEntry result={result}
            key={index}
          />
        )}
      </div>
    )
  };
}
const mapStateToProps = (state) => {
  return {
    username: state.username,
    shows: state.shows,
    searchResults: state.searchResults
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    onAddShow: (show) => dispatch(addShow(show)),
    onReset: () => dispatch(reset())
  }
}

App.propTypes = {
  user: PropTypes.string,
  shows: PropTypes.array,
  searchResults: PropTypes.array,
  onAddShow: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}


export default SearchList = connect(mapStateToProps, mapDispatchToProps)(SearchList);


export default SearchList;