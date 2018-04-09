import React from 'react';
import SearchEntry from './SearchEntry';
import { PaneStyle, ButtonStyle, InputStyle } from '../styles';

class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
    this.handleChange = this.handleChange.bing(this);
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit() {
    if (this.state.searchQuery !== '') {
      this.props.search(this.state.searchQuery);
    }
  }

  render() {
    return (
      <div style={PaneStyle} >
        <div>
          <input
            style={InputStyle}
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
          <button style={ButtonStyle} onClick={this.handleSubmit}> Search! </button>
        </div>
        <h4> Search Results </h4>
        {this.props.results.length} results found.
        {this.props.results.map((result, index) => (
          <SearchEntry
            show={result}
            key={index}
            addShow={this.props.addShow}
            makeShowActive={this.props.makeShowActive}
          />
        ))}
      </div>
    );
  }
}

export default SearchList;
