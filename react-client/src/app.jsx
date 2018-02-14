import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from './actions.js';
import ShowList from './components/ShowList.jsx';
import SearchList from './components/SearchList.jsx';

import {
  addShow,
  search,
  reset,
} from './actions';

class App extends React.Component {

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
      <nav className = 'nav-bar'> <ul>
        <li> Hello {this.props.user} </li>
        <li> Login </li>
        <li> Sign Up </li>
        <li> Log Out </li>
      </ul> </nav>
      <SearchList results={this.props.searchResults} />
      <ShowList shows={this.props.shows}/>
    </div>)
  }
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


export default App = connect(mapStateToProps, mapDispatchToProps)(App);

