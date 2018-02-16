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
      searchResults: [{title: 'we'}],
      loggedIn: true
    }
  }

  componentDidMount() {
    this.refreshShowList();
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
        context.refreshShowList();
      })
      .catch(function (err) {
        console.log('err', err);
      });
  }

  signup(username, password) {
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
        context.setState({user: username, loggedIn: true});
      })
      .catch(function (err) {
        console.log('err', err);
    });
  };

  login(username, password) {
    let context = this;
    axios({
      method: 'get',
      url: '/users',
      data: {
        user: username,
        show: password
      }
    })
      .then(function (results) {
        context.setState({ user: username, loggedIn: true }, () =>
          context.refreshShowList()
        );
      })
      .catch(function (err) {
        console.log('err', err);
    });
  }

  render () {
    if (this.state.loggedIn) {
      return (<div>
        <h1 id = 'title' >PodStar</h1>
        <nav className = 'nav-bar'> <ul>
          <li> Hello {this.state.user}! </li>
          <li> Login </li>
          <li> Sign Up </li>
          <li> Log Out </li>
        </ul> </nav>
        <ShowList shows={this.state.shows}  />
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
        <LogIn login = {this.login.bind(this)}/>
        <Signup signup = {this.signup.bind(this)}/>
      </div>)
    }
  }
}

export default App;

