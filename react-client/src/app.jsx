import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';
import ShowList from './components/ShowList.jsx';
import SearchList from './components/SearchList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'tester',
      shows: [],
      searchResults: ['we', 'are', 'search', 'results']
    }
  }

  componentDidMount() {
    this.refreshShowList();
  }

  refreshShowList() {
    let context = this;
    axios.get('/shows', {
      params: {
        user: 'yoohoo!'
      }
    })
      .then(function (data) {
        console.log(data);
        context.setState({
          shows: data
        })
      })
      .catch(function (err) {
        console.log('err', err);
      });

    // $.ajax({
    //   type: 'GET',
    //   url: '/shows',
    //   //dataType: 'json',
    //   data: JSON.stringify({
    //     user: 'yoohoo!'
    //   }),
    //   success: (data) => {

    //   },
    //   error: (err) => {
        
    //   }
    // });
  }

  search(query) {
    let context = this;
    $.ajax({
      method: 'GET',
      url: '/search',
      data: {
        query: query
      },
      success: (results) => {
        console.log('nice search!');
        context.setState({
          searchResults: results
        })
      }
    });
  }

  addShow(show) {
    let context = this;
    $.ajax({
      method: 'POST',
      url: '/shows',
      data: {
        user: context.state.user,
        show: show
      },
      success: (data) => {
        console.log('show was added');
        context.refreshShowList();
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
        <li> Hello {this.state.user}! </li>
        <li> Login </li>
        <li> Sign Up </li>
        <li> Log Out </li>
      </ul> </nav>
      <SearchList results={this.state.searchResults} search = {this.search.bind(this)} />
      <ShowList shows={this.state.shows} addShow = {this.addShow.bind(this)}/>
    </div>)
  }
}

export default App;

