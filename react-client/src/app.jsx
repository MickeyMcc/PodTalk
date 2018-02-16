import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';
import ShowList from './components/ShowList.jsx';
import SearchList from './components/SearchList.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      shows: [],
      searchResults: [],
      loggedIn: false
    }
  };

  componentDidMount() {
    if (this.state.loggedIn) {
      this.refreshShowList();
    }
  };

///////////////////USERS\\\\\\\\\\\\\\\\\\\\\\\\\\

  signup(username, password) {
    console.log(username);
    let context = this;
    axios({
      method: 'post',
      url: '/users',
      data: {
        user: username,
        password: password
      }
    })
      .then(function (results) {
        if (results.statusCode === 400) {
          console.log('SORRY COULD NOT CREATE USER');
        } else {
          console.log(`WELCOME TO PODSTAR ${username}!`)
          console.log(JSON.stringify(results.data));
          context.setState({ user: results.data, loggedIn: true });
        }
      })
      .catch(function (err) {
        console.log('err', err);
    });
  };

  login(username= 'new', password = 'user') {

    let context = this;
    axios({
      method: 'get',
      url: '/users',
      params: {
        user: username,
        password: password
      }
    })
      .then(function (results) {
        if (results.statusCode === 400) {
          console.log('SORRY COULD NOT LOGIN');
        } else {
          console.log( `WELCOME BACK ${results.data.username}!`)
          context.setState({ user: results.data, loggedIn: true });
          context.refreshShowList();
        }
      })
      .catch(function (err) {
        console.log('err', err);
    });
  };

  logout() {
    let context = this;
    axios({
      method: 'delete',
      url: '/users',
    })
      .then(function(results) {
        context.setState({user: null, loggedIn: false});
      })
      .catch(function (err) {
        console.log('err', err);
    });
  };

///////////////////SHOWS\\\\\\\\\\\\\\\\\\\\\\\\\\

  refreshShowList() {
    let context = this;
    axios.get('/shows', {
      params: {
        userId: context.state.user.id
      }
    })
      .then(function (results) {
        if (results.statusCode === 404) {
          context.setState({
            loggedIn: false
          });
        } else {
          context.setState({
            shows: results.data
          })
        }
      })
      .catch(function (err) {
        console.log('err', err);
      });
  };

  addShow(show) {
    let context = this;
    axios({
      method: 'post',
      url: '/shows', 
      data: {
        userId: context.state.user.id,
        show: show    //from search results, doesn't have id
      }
    })
      .then(function (results) {
        if (results.statusCode === 404) {
          context.setState({
            loggedIn: false
          });
        } else {
          context.refreshShowList();
        }
      })
      .catch(function (err) {
        console.log('err', err);
      });
  };

///////////////////SEARCH\\\\\\\\\\\\\\\\\\\\\\\\\\

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
        if (results.statusCode === 404) {
          context.setState({
            loggedIn: false
          });
        } else {
          context.setState({
          searchResults: results.data
          });
        }
      })
      .catch(function (err) {
        console.log('err', err);
      });
  };

///////////////////COMMENTS\\\\\\\\\\\\\\\\\\\\\\\\\\

  saveComment(comment, showID) {
    let context = this;
    axios({
      method: 'post',
      url: '/comments',
      data: {
        comment: comment,
        showID: showID,
        userID: context.state.user.id
      }
    })
      .then(function(results) {
        console.log('comment saved');
      })
      .catch(function(err) {
        console.log(err);
      })
  }

///////////////////RENDER\\\\\\\\\\\\\\\\\\\\\\\\\\

  render () {
    if (this.state.loggedIn) {
      return (<div>
        <h1 id = 'title' >PodStar</h1>
        <nav className = 'nav-bar'> <ul>
          <li> Hello {this.state.user.username}! </li>
          <li> Login </li>
          <li> Sign Up </li>
          <li onClick = {this.logout.bind(this)}> Log Out </li>
        </ul> </nav>
        <ShowList shows={this.state.shows}
          saveComment = {this.saveComment.bind(this)}
        />
        <SearchList 
          results={this.state.searchResults} 
          search={this.search.bind(this)} 
          addShow={this.addShow.bind(this)}
        />
      </div>)
    } else {
      return (
      <div>
        <h1 id='title' >PodStar</h1>
        <nav className='nav-bar'> <ul>
          <li> Hello Guest! </li>
        </ul> </nav>
        <Login login = {this.login.bind(this)}/>
        <Signup signup = {this.signup.bind(this)}/>
      </div>)
    }
  }
}

export default App;

