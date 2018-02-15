import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';
import ShowList from './components/ShowList.jsx';
import SearchList from './components/SearchList.jsx';


class App extends React.Component {
  constructor() {
    this.state = {
      user: 'tester',
      shows: [],
      searchResults: ['we', 'are', 'search', 'results']
    }
  }

  componentDidMount() {
    this.refreshShowList;
  }

  refreshShowList() {
    context = this;
    $.ajax({
      method: 'GET',
      url: '/shows',
      data: {
        user: context.state.user
      },
      success: (data) => {
        context.setState({
          shows: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  search(query) {
    context = this;
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
    context = this;
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
        <li> Hello {this.props.user}! </li>
        <li> Login </li>
        <li> Sign Up </li>
        <li> Log Out </li>
      </ul> </nav>
      <SearchList results={this.props.searchResults} search = {this.search.bind(this)} />
      <ShowList shows={this.props.shows} addShow = {this.addShow.bind(this)}/>
    </div>)
  }
}

App.propTypes = {
  user: PropTypes.string,
  shows: PropTypes.array,
  searchResults: PropTypes.array,
  onAddShow: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}


export default App;

