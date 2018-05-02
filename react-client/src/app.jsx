import React from 'react';
import axios from 'axios';
import { Tabs, Tab } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import ShowList from './components/ShowList';
import Login from './components/Login';
import Signup from './components/Signup';
import SearchDrawer from './components/SearchDrawer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      shows: [],
      loggedIn: false,
      searchOpen: false,
    };
    this.addShow = this.addShow.bind(this);
    this.logout = this.logout.bind(this);
    this.search = this.search.bind(this);
    this.setUser = this.setUser.bind(this);
    this.openSearch = this.openSearch.bind(this);
    this.refreshShowList = this.refreshShowList.bind(this);
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      this.refreshShowList();
    }
  }

  // ///////////////// COMMENTS \\\\\\\\\\\\\\\\\\\\\\\\\\

  getUsersComments() {
    const context = this;
    axios.get('/comments', {
      params: {
        userID: context.state.user.id,
      },
    })
      .then((results) => {
        context.setState({ userComments: context.transformComments(results.data) });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // /////////////////USERS\\\\\\\\\\\\\\\\\\\\\\\\\\

  setUser(userObj) {
    this.setState({ user: userObj, loggedIn: true });
    this.refreshShowList();
  }

  logout() {
    const context = this;
    axios({
      method: 'delete',
      url: '/users',
    })
      .then(() => {
        context.setState({ loggedIn: false });
        context.setState({
          user: { username: 'guest' },
          userMessage: 'Log out successful!',
          activeShow: null,
          activity: false,
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  // /////////////////SHOWS\\\\\\\\\\\\\\\\\\\\\\\\\\

  refreshShowList() {
    const context = this;
    axios.get('/shows', {
      params: {
        userId: context.state.user.id,
      },
    })
      .then((results) => {
        if (results.statusCode === 404) {
          context.setState({
            loggedIn: false,
          });
        } else {
          context.setState({
            shows: results.data,
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  addShow(show) {
    const context = this;
    axios.post('/shows', {
      userID: context.state.user.id,
      show, // from search results, doesn't have id
    })
      .then((results) => {
        if (results.statusCode === 404) {
          context.setState({
            loggedIn: false,
          });
        } else {
          context.setState({ userMessage: 'Show added!' });
          context.refreshShowList();
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  // /////////////////SEARCH\\\\\\\\\\\\\\\\\\\\\\\\\\

  openSearch() {
    this.setState({ searchOpen: !this.state.searchOpen });
  }

  search(query) {
    const context = this;
    axios.get('/search', {
      params: {
        terms: query,
      },
    })
      .then((results) => {
        if (results.statusCode === 404) {
          context.setState({
            loggedIn: false,
          });
        } else {
          context.setState({
            searchResults: results.data,
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  // /////////////////RENDER\\\\\\\\\\\\\\\\\\\\\\\\\\

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <img
            style={{
              width: '96%',
              maxWidth: '400px',
              marginLeft: '2%',
              marginRight: '2%',
            }}
            src="./images/logo.png"
            alt=""
          />
          <Tabs>
            <Tab label="login">
              <Login setUser={this.setUser} />
            </Tab>
            <Tab label="create account">
              <Signup setUser={this.setUser} />
            </Tab>
          </Tabs>
        </div>
      );
    }

    const navbar = (
      <Tabs>
        <Tab label="Your Feed">
          <ShowList
            userID={this.state.user.id}
            shows={this.state.shows}
          />
        </Tab>
        <Tab label="World Feed">
          <ShowList
            userID={this.state.user.id}
            shows={this.state.shows}
          />
        </Tab>
      </Tabs>
    );

    return (
      <div>
        <img
          style={{
            width: '96%',
            maxWidth: '400px',
            marginLeft: '2%',
            marginRight: '2%',
          }}
          src="./images/logo.png"
          alt=""
        />
        <RaisedButton
          style={{ float: 'right', marginRight: '15px', marginTop: '15px' }}
          onClick={this.openSearch}
          label="Search"
          secondary
        />
        <SearchDrawer
          open={this.state.searchOpen}
          close={this.openSearch}
          userID={this.state.user.id}
          refreshUserShows={this.refreshShowList}
        />
        {navbar}
      </div>
    );
  }
}

export default App;
