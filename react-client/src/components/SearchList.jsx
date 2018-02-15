import React from 'react';
import SearchEntry from './SearchEntry.jsx';

const SearchList = (props) => {
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

export default SearchList;