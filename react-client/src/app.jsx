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
      user: 'test',
      shows: [],
      searchResults: [{title: 'we'}]
    }
  }

  componentDidMount() {
    this.refreshShowList();
    //this.search('gimlet');
  }

  refreshShowList() {
    let context = this;
    axios.get('/shows', {
      params: {
        user: context.state.user
      }
    })
      .then(function (data) {
        console.log(data);
        if (data.data === null) {
          console.log('no shows here');
        } else {
          context.setState({
            shows: data.data
          })
        }
      })
      .catch(function (err) {
        console.log('err', err);
      });
  }

  search(query) {
    console.log('searching for', query);
    let context = this;
    console.log(query);
    axios.get('/search', {
      params: {
        terms: query
      }
    })
      .then(function (results) {
        console.log('nice search!', results);

        context.setState({
          searchResults: results.data
        })
      })
      .catch(function (err) {
        console.log('err', err);
      });
  }

  addShow(show) {
    let context = this;
    axios({
      method: 'post',
      url: '/shows', 
      data: {
        user: context.state.user,
        show: show
      }
    })
      .then(function (results) {
        console.log('show was added');
        context.refreshShowList();
      })
      .catch(function (err) {
        console.log('err', err);
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

