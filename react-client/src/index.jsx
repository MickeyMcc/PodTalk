import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ShowList from './components/ShowList.jsx';
import SearchList from './components/SearchList.jsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  addShow,
  search,
  reset,
} from './actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
      shows: [],
      searchResults: ['hey', 'we', 'are', 'results']
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/shows', 
      success: (data) => {
        this.setState({
          shows: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1 id = 'title' >PodStar</h1>
      <SearchList results={this.state.searchResults} />
      <ShowList shows={this.state.shows}/>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    shows: state.shows
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    onAddShow: (show) => dispatch(addShow(show)),
    onReset: () => dispatch(reset())
  }
}

ReactDOM.render(<App />, document.getElementById('app'));